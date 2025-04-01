import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import { hash, compare } from "bcrypt";
import HttpResponse, { type HttpResponseType } from "../common/HttpResponse";
import { JwtService } from "../common/JWTService";
import { Role } from "../models/Role";
import { AuthToken } from "../models/AuthToken";
import { randomBytes } from "crypto";
import type {
  AuthenticateUserForm,
  AuthenticateUserResponse,
  CreateUserForm,
  ResetPasswordForm,
  UpdateUserProfileForm,
  ValidateOtpForm,
} from "../forms/authentication";
import { generateOtp } from "../common/utils";

/**
 * Service class handling user-related operations including authentication,
 * user management, and OTP verification
 */
export class AuthenticationService {
  private jwtService: JwtService;

  private isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  constructor(request: Request) {
    this.jwtService = new JwtService(request);
  }

  /**
   * Retrieves the authenticated user from bearer token
   * @returns Promise resolving to User object or HTTP response
   */
  async authUser(): Promise<User | HttpResponseType> {
    try {
      const user = await User.findOne({
        where: { uuid: this.jwtService.getCurrentUserId() },
        relations: ["role"],
      });

      if (!user) {
        return HttpResponse.failure("User not found", 404);
      }

      return user;
    } catch (error) {
      return HttpResponse.failure("Authentication failed", 401);
    }
  }

  /**
   * Creates a new user or updates an existing user based on provided data
   * @param data - User creation form data
   * @returns Promise resolving to User object or HTTP response
   */
  async saveUser(data: CreateUserForm): Promise<User | HttpResponseType> {
    // Step 1: Check for existing user and valid role
    const existingUser = await User.findOne({ where: { email: data.email } });
    const role = await Role.findOne({ where: { name: data.role } });
    if (!role) {
      return HttpResponse.failure("User role must be specified", 400);
    }

    // Step 2: Handle phone number verification
    if (data.phoneNumber) {
      const userByPhone = await User.findOne({
        where: { phone: data.phoneNumber },
      });
      if (userByPhone) {
        if (userByPhone.phone_verified_at) {
          return HttpResponse.failure("User with phone number exists", 400);
        } else {
          return await this.resetUserOtp(userByPhone.uuid);
        }
      }
    }

    // Step 3: Create new user if doesn't exist
    if (!existingUser) {
      // Initialize new user object with provided data
      const newUser = new User();
      newUser.uuid = uuidv4();
      newUser.first_name = data.firstName;
      newUser.last_name = data.lastName;
      newUser.email = data.email;
      newUser.phone = data.phoneNumber;
      newUser.password = data.password ? await hash(data.password, 10) : "";
      newUser.password_created_at = new Date();
      newUser.otp = data.otp;
      newUser.otp_expired_at = new Date(Date.now() + 43200 * 60 * 1000); // 30 days
      newUser.role_id = role.id.toString();
      newUser.sso_id = data.ssoId;

      // Set the new fields
      newUser.state = data.state;
      newUser.country = data.country;
      newUser.default_currency = data.defaultCurrency;

      const user = await User.create(newUser).save();

      // Handle SSO verification
      if (data.isSso) {
        user.email_verified_at = new Date();
        await user.save();
      }

      return user;
    } else {
      // Step 4: Handle existing user scenarios
      if (data.ignoreError) {
        // Update existing user if ignoreError flag is true
        existingUser.first_name = data.firstName || existingUser.first_name;
        existingUser.last_name = data.lastName || existingUser.last_name;
        existingUser.otp = data.otp;

        // Update new fields if provided
        existingUser.state = data.state || existingUser.state;
        existingUser.country = data.country || existingUser.country;
        existingUser.default_currency =
          data.defaultCurrency || existingUser.default_currency;

        await existingUser.save();
        return existingUser;
      }

      if (existingUser.email_verified_at && existingUser.password) {
        return HttpResponse.failure("User with email already exists", 400);
      }

      return existingUser;
    }
  }

  /**
   * Authenticates user with email and password
   * @param username - User's email or phone number
   * @param password - User's password
   * @returns Promise resolving to token and user object or HTTP response
   */
  async authenticateUser(
    data: AuthenticateUserForm,
  ): Promise<AuthenticateUserResponse | HttpResponseType> {
    let user: User | null = null;

    if (this.isNumeric(data.username)) {
      user = await User.findOne({
        where: { phone: data.username },
        select: [
          "id",
          "first_name",
          "last_name",
          "email",
          "phone",
          "password",
          "sso_id",
          "uuid",
        ],
      });
    } else {
      user = await User.findOne({
        where: { email: data.username },
        select: [
          "id",
          "first_name",
          "last_name",
          "email",
          "phone",
          "password",
          "sso_id",
          "uuid",
        ],
      });
    }

    if (!user) {
      return HttpResponse.failure(
        "User with email does not exist, please Sign Up.",
        401,
      );
    }

    // Step 2: Validate credentials
    if (data.password) {
      // Compare provided password with stored hashed password
      const isValidPassword = await compare(data.password, user.password);
      if (!isValidPassword) {
        return HttpResponse.failure(
          "Credentials do not match our records!",
          401,
        );
      }
    } else {
      // SSO login validation
      if (user.sso_id && user.sso_id !== data.sso_id) {
        return HttpResponse.failure(
          "Credentials do not match our records!",
          401,
        );
      }
    }

    // Step 3: Generate JWT token
    const token = this.jwtService.generateToken(user);

    // Step 4: Handle device login limits
    if (process.env.APP_STATE && token) {
      const maxActiveDevices = 4;
      const existingTokens = await AuthToken.find({
        where: { auth_id: user.uuid },
        order: { created_at: "ASC" },
      });

      // Remove older tokens if limit exceeded (keep the first token, delete the rest)
      if (existingTokens.length >= maxActiveDevices) {
        for (const oldToken of existingTokens.slice(1)) {
          await AuthToken.delete(oldToken.id);
        }
      }

      // Create new auth token
      AuthToken.create({
        auth_id: user.uuid,
        auth_token: token,
      });
    }

    return token
      ? { token, user }
      : HttpResponse.failure("Credentials do not match our records!", 401);
  }

  /**
   * Resets user OTP and updates expiration time
   * @param userUuid - UUID of the user
   * @returns Promise resolving to User object or HTTP response
   */
  async resetUserOtp(userUuid: string): Promise<User | HttpResponseType> {
    // Step 1: Find user by UUID
    let user = await User.findOne({ where: { uuid: userUuid } });

    if (!user) {
      user = await User.findOne({ where: { email: userUuid } });
    }
    if (!user) {
      return HttpResponse.failure("User not found", 400);
    }

    // Step 2: Generate and set new OTP
    const otp = generateOtp();
    user.otp = otp;
    user.otp_expired_at = new Date(Date.now() + 43200 * 60 * 1000); // 30 days expiration
    await user.save();

    return user;
  }

  /**
   * Updates user password after verification
   * @param data - Object containing user email and new password
   * @returns Promise resolving to success message or HTTP response
   */
  async updateUserPassword(data: ResetPasswordForm): Promise<HttpResponseType> {
    // Step 1: Find and validate user
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return HttpResponse.failure("User not found", 400);
    }

    if (!user.email_verified_at) {
      return HttpResponse.failure("Email not verified", 400);
    }

    // Step 2: Hash and update password
    user.password = await hash(data.password, 10);
    await user.save();

    return HttpResponse.success("Password updated successfully", 200);
  }

  /**
   * Updates user profile information
   * @param userUuid - UUID of the user
   * @param data - Object containing updated user information
   * @returns Promise resolving to updated User object or HTTP response
   */
  async updateUserProfile(
    data: UpdateUserProfileForm,
  ): Promise<User | HttpResponseType> {
    // Step 1: Find and validate user
    const user = await User.findOne({ where: { uuid: data.userUuid } });
    if (!user) {
      return HttpResponse.failure("User not found", 400);
    }

    // Step 2: Check for phone number uniqueness if being updated
    if (data.phoneNumber && data.phoneNumber !== user.phone) {
      const existingUserWithPhone = await User.findOne({
        where: { phone: data.phoneNumber },
      });
      if (existingUserWithPhone) {
        return HttpResponse.failure("Phone number already exists", 400);
      }
    }

    // Check if email is being updated and is unique
    if (data.email) {
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser && existingUser.uuid !== user.uuid) {
        return HttpResponse.failure("Email already in use", 400);
      }
    }

    // Step 3: Update user information
    user.first_name = data.firstName || user.first_name;
    user.last_name = data.lastName || user.last_name;
    user.phone = data.phoneNumber || user.phone;
    user.email = data.email || user.email;

    if (data.phoneNumber && data.phoneNumber !== user.phone) {
      user.phone_verified_at = undefined; // Reset phone verification if number changed
    }

    await user.save();
    return user;
  }

  /**
   * Logs out user by invalidating their auth token
   * @param userUuid - UUID of the user
   * @param token - Authentication token to invalidate
   * @returns Promise resolving to success message
   */
  async logoutUser(): Promise<HttpResponseType> {
    // Currrent auth user
    const currentUser = await User.findOne({
      where: { uuid: this.jwtService.getCurrentUserId() },
    });

    const token = this.jwtService.getBearerToken();
    // Step 1: Remove auth token if APP_STATE is enabled
    if (process.env.APP_STATE) {
      await AuthToken.delete({ auth_id: currentUser?.uuid, auth_token: token });
    }

    return HttpResponse.success("Logged out successfully", 200);
  }

  /**
   * Verifies user OTP and updates verification status
   * @param data - Object containing user identifier and OTP
   * @returns Promise resolving to User object or HTTP response
   */
  async verifyUserOtp(data: ValidateOtpForm): Promise<User | HttpResponseType> {
    // Step 1: Find user by UUID or email
    let user = await User.findOne({ where: { uuid: data.userUuid } });

    if (!user && data.email) {
      user = await User.findOne({ where: { email: data.email } });
    }

    if (!user) {
      return HttpResponse.failure("User not found", 400);
    }

    // Step 2: Validate OTP
    if (user.otp_expired_at && user.otp_expired_at < new Date()) {
      return HttpResponse.failure("OTP expired", 400);
    }

    if (user.otp !== data.otp.trim()) {
      return HttpResponse.failure("Incorrect OTP! Enter valid otp", 400);
    }

    // Step 3: Handle phone/email verification
    if (data.phone) {
      user.phone = data.phone;
      user.phone_verified_at = new Date();
      await user.save();
      return user;
    } else {
      if (user.email_verified_at) {
        return HttpResponse.success("OTP Verified", 200);
      }
      user.email_verified_at = new Date();
      await user.save();
    }

    return HttpResponse.success("OTP Verified", 200);
  }

  /**
   * Deletes user account
   * @param userId - UUID of the user
   * @returns Promise resolving to HTTP response
   */
  async deleteUser(userId: string): Promise<HttpResponseType> {
    const user = await User.findOne({ where: { uuid: userId } });

    if (!user) {
      return HttpResponse.failure("User not found", 400);
    }

    await User.update(userId, {
      first_name: "Deleted",
      last_name: "Account",
      email: "",
      phone: "",
      status: "deleted",
    });

    return HttpResponse.success("User deleted successfully", 200);
  }
}

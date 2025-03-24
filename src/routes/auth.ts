import { AuthenticationController } from "../controllers/AuthenticationController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get authenticated user details
 *     description: Returns the currently authenticated user's information
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - User not authenticated
 */
router.add("GET", `/${APP_VERSION}/auth/me`, async (request: BunRequest) => {
  const result = await new AuthenticationController().getAuthUser(request);

  return new Response(JSON.stringify(result.body), {
    headers: { "Content-Type": "application/json" },
    status: result.statusCode,
  });
});

/**
 * @swagger
 * /v1/auth/users:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create new user
 *     description: Register a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserForm'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 userUuid:
 *                   type: string
 *                   example: "uuid"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/users`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().createAuthUser(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticateUserForm'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticateUserResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/login`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().login(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/reset-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset OTP
 *     description: Generate a new OTP for user verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordForm'
 *     responses:
 *       200:
 *         description: OTP reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP reset successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/reset-otp`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().resetUserOtp(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     description: Verify the OTP provided by the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidateOtpForm'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully"
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/verify-otp`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().verifyUserOtp(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/update-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Update user password
 *     description: Update the authenticated user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "currentPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *       400:
 *         description: Invalid password format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid password format"
 *       401:
 *         description: Current password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Incorrect current password"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/update-password`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserPassword(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/update-profile:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfileForm'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/update-profile`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserProfile(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User logout
 *     description: Logout the currently authenticated user
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged out"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/logout`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().logout(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/users/{id}:
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Delete user
 *     description: Delete a user account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - User doesn't have permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
router.add(
  "DELETE",
  `/${APP_VERSION}/auth/users/:id`,
  async (request: BunRequest) => {
    const result = await new AuthenticationController().deleteUser(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *        userUuid:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        phoneNumber:
 *          type: string
 *          nullable: true
 *        role:
 *          type: string
 *     CreateUserForm:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           example: "123-456-7890"
 *         password:
 *           type: string
 *           nullable: true
 *           example: "password123"
 *         role:
 *           type: string
 *           example: "admin"
 *         ssoId:
 *           type: string
 *           nullable: true
 *           example: "sso123"
 *         otp:
 *           type: string
 *           nullable: true
 *           example: "123456"
 *         isSso:
 *           type: boolean
 *           example: false
 *         ignoreError:
 *           type: boolean
 *           example: false
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - role
 *     AuthenticateUserForm:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           nullable: true
 *           example: "password123"
 *         sso_id:
 *           type: string
 *           nullable: true
 *           example: "sso123"
 *       required:
 *         - username
 *     AuthenticateUserResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ResetPasswordForm:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *       required:
 *         - email
 *     ValidateOtpForm:
 *       type: object
 *       properties:
 *         userUuid:
 *           type: string
 *           nullable: true
 *           example: "uuid"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "123-456-7890"
 *         otp:
 *           type: string
 *           example: "123456"
 *       required:
 *         - otp
 *     UpdateUserProfileForm:
 *       type: object
 *       properties:
 *         userUuid:
 *           type: string
 *           example: "uuid"
 *         firstName:
 *           type: string
 *           nullable: true
 *           example: "Jane"
 *         lastName:
 *           type: string
 *           nullable: true
 *           example: "Smith"
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           example: "987-654-3210"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "jane.smith@example.com"
 *       required:
 *         - userUuid
 */

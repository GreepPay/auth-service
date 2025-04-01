// Request Forms

import type { User } from "../models";

export interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  role: string;
  ssoId?: string;
  otp?: string;
  isSso?: boolean;
  ignoreError?: boolean;
}

export interface UpdateUserProfileForm {
  userUuid: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ValidateOtpForm {
  userUuid?: string;
  email?: string;
  phone?: string;
  otp: string;
}

export interface ResetPasswordForm {
  email: string;
  uuid?: string;
  password: string;
  phone?: string;
  otp?: string;
}

export interface AuthenticateUserForm {
  username: string;
  password?: string;
  sso_id?: string;
}

// Response Forms

export interface AuthenticateUserResponse {
  token: string;
  user: User;
}

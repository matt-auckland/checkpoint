import { type User } from './UserTypes.ts';

export type AuthLoginAPI = {
  Body: {
    email: string;
    password: string;
  };
};

export type AuthLoginResponseBody = {
  user: User;
  token: string;
};

export type AuthLogoutAPI = {
  Headers: AuthHeaders;
};

export type AuthSignupAPI = {
  Body: {
    email: string;
    fullName: string;
    password: string;
  };
};

export type AuthSignUpResponseBody = AuthLoginResponseBody;

export type AuthHeaders = {
  Authorization: string;
};

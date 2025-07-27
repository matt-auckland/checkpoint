import type {
  AuthLoginAPI,
  AuthLoginResponseBody,
  AuthSignupAPI,
  AuthSignUpResponseBody,
} from 'shared';
import { api } from './api';

export const authAPI = {
  login: {
    post: (data: AuthLoginAPI['Body']) => {
      return api('/auth/login', {
        method: 'POST',
        body: data,
      }) as Promise<AuthLoginResponseBody>;
    },
  },
  signup: {
    post: (data: AuthSignupAPI['Body']) => {
      return api('/auth/signup', {
        method: 'POST',
        body: data,
      }) as Promise<AuthSignUpResponseBody>;
    },
  },
  logout: {
    post: () => api('/auth/logout', { method: 'POST' }),
  },
};

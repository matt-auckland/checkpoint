import type {
  User,
  UserGetSingleAPIResponse,
  UserUpdateSingleAPI,
} from 'shared';
import { api } from './api';

export const userAPI = {
  all: {
    get: function (): Promise<User> {
      return api('/user', {
        method: 'GET',
      }) as Promise<UserGetSingleAPIResponse>;
    },
  },
  one: {
    get: (id: string) => api(`/user/${id}`, { method: 'GET' }),
    update: (id: string, data: UserUpdateSingleAPI['Body']) =>
      api(`/user/${id}`, { method: 'PATCH', body: data }),
  },
};

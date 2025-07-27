import type {
  Team,
  TeamCreateAPI,
  TeamUpdateSingleAPI,
  UserLite,
} from 'shared';
import { api } from './api';

export const teamAPI = {
  all: {
    get: () => api('/team', { method: 'GET' }) as Promise<Team[]>,
  },
  one: {
    get: (id: string) => api(`/team/${id}`, { method: 'GET' }) as Promise<Team>,
    updateTeam: (id: string, data: TeamUpdateSingleAPI['Body']) =>
      api(`/team/${id}/entry`, {
        method: 'PATCH',
        body: data,
      }) as Promise<Team>,
    createTeam: (user: UserLite) => {
      const body: TeamCreateAPI['Body'] = { user };
      return api(`/team/`, {
        method: 'POST',
        body,
      }) as Promise<Team>;
    },
  },
};

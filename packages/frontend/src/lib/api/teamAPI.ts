import type {
  Team,
  TeamCreateAPI,
  TeamDataFull,
  TeamUpdateSingleAPI,
  UserLite,
} from 'shared';
import { api } from './api';

export const teamAPI = {
  all: {
    get: () => api('/team', { method: 'GET' }) as Promise<Team[]>,
  },
  one: {
    get: (id: string, date?: string) => {
      let url = `/team/${id}`;
      if (date) {
        url += `?date=${date}`;
      }
      return api(url, { method: 'GET' }) as Promise<TeamDataFull>;
    },

    updateTeam: (id: string, data: TeamUpdateSingleAPI['Body']) => {
      return api(`/team/${id}`, {
        method: 'PATCH',
        body: data,
      }) as Promise<Team>;
    },
    createTeam: (user: UserLite) => {
      const body: TeamCreateAPI['Body'] = { user };
      return api(`/team/`, {
        method: 'POST',
        body,
      }) as Promise<Team>;
    },
    deleteUser(userId: string, teamId: string) {
      return api(`/team/${teamId}/member/${userId}`, {
        method: 'DELETE',
      }) as Promise<Team>;
    },
    addUsers(userIds: string[], teamId: string) {
      return api(`/team/${teamId}/member/`, {
        method: 'POST',
        body: {
          UserIds: userIds,
        },
      }) as Promise<Team>;
    },
  },
};

import type { TeamUpdateSingleAPI } from 'shared';
import { api } from './api';

export const teamAPI = {
  all: {
    get: () => api('/team', { method: 'GET' }),
  },
  one: {
    get: (id: string) => api(`/team/${id}`, { method: 'GET' }),
    updateTeam: (id: string, data: TeamUpdateSingleAPI['Body']) =>
      api(`/team/${id}/entry`, { method: 'PATCH', body: data }),
    createTeam: (id: string) => api(`/team/${id}/entry`, { method: 'POST' }),
  },
};

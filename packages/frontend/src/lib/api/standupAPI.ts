import type { StandupCreateEntryAPI, StandupUpdateEntryAPI } from 'shared';
import { api } from './api';

export const standupAPI = {
  all: {
    get: () => api('/standup', { method: 'GET' }),
  },
  one: {
    get: (id: string) => api(`/standup/${id}`, { method: 'GET' }),
    updateEntry: (id: string, data: StandupUpdateEntryAPI['Body']) =>
      api(`/standup/${id}/entry`, { method: 'PATCH', body: data }),
    createEntry: (id: string, data: StandupCreateEntryAPI['Body']) =>
      api(`/standup/${id}/entry`, { method: 'POST', body: data }),
    // createStandup: (id: string, data: StandupCreateStandupAPI['Body']) =>
    //   api(`/standup/`, { method: 'POST', body: data }),
  },
};

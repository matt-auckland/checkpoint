import type {
  CheckInCreateAPI,
  CheckInFull,
  CheckInGetMultipleAPI,
  CheckInUpdateEntryAPI,
} from 'shared';
import { api } from './api';

export const checkinAPI = {
  all: {
    get: ({ date, teamId, userId }: CheckInGetMultipleAPI['Querystring']) => {
      const params = new URLSearchParams();
      if (date) params.set('date', date);
      if (teamId) params.set('teamId', teamId);
      if (userId) params.set('userId', userId);

      const url = `/checkin?${params.toString()}`;

      return api(url, { method: 'GET' }) as Promise<CheckInFull[]>;
    },
  },
  one: {
    get: (id: string) =>
      api(`/checkin/${id}`, { method: 'GET' }) as Promise<CheckInFull>,
    updateCheckIn: (id: string, data: CheckInUpdateEntryAPI['Body']) =>
      api(`/checkin/${id}`, {
        method: 'PATCH',
        body: data,
      }) as Promise<CheckInFull>,
    createCheckIn: (data: CheckInCreateAPI['Body']) =>
      api(`/checkin/`, { method: 'POST', body: data }) as Promise<CheckInFull>,
  },
};

import type { StandupEntry } from './StandupTypes';

export type Team = {
  _id: string;
  name: string;
  memberIds: string[];
  standupHistory?: StandUpHistory;
  latestCheckIns?: StandupEntry[];
};

type StandUpHistory = {
  [date: string]: StandupEntry[];
};

import type { ObjectId } from 'mongodb';
import { type StandupEntry } from './StandupTypes';

export type User = {
  _id?: ObjectId;
  email: string;
  fullName: string;
  settings: UserSettings;
  teams: string[];
  recentStandups?: StandupEntry[];
  standupHistory?: StandupEntry[];
};

export type UserSettings = {
  colorMode: 'system' | 'dark' | 'light';
  colorTheme: 'default';
};

//UserApis
export type UserGetSingleApi = {
  Params: {
    id: string;
  };
};

export type UserPatchSingleApi = {
  Params: {
    id: string;
  };
};

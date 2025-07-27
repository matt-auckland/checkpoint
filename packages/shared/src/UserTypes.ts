import type { ObjectId } from 'mongodb';
import { type StandupEntryFull } from './StandupTypes';

export type User = {
  _id?: ObjectId;
  email: string;
  fullName: string;
  settings: UserSettings;
  teams: string[];
  recentStandups?: StandupEntryFull[];
  standupHistory?: StandupEntryFull[];
};

export type NewUser = Omit<User, '_id'>;

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
    patchData: User;
  };
};

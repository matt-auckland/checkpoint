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
export type UserGetSingleAPI = {
  Params: {
    id: string;
  };
};

export type UserGetSingleAPIResponse = User;

export type UserUpdateSingleAPI = {
  Params: {
    id: string;
  };
  Body: {
    patchData: User;
  };
};

import type { ObjectId } from 'mongodb';
import { type StandupEntryFull } from './StandupTypes';
import type { Team, TeamLite } from './TeamTypes';

export type User = {
  _id?: ObjectId;
  email: string;
  fullName: string;
  settings: UserSettings;
  teams: TeamLite[];
  recentStandups?: StandupEntryFull[];
  standupHistory?: StandupEntryFull[];
};

export type NewUser = Omit<User, '_id'>;

export type UserLite = {
  _id: string;
  fullName: string;
};

export type UserSettings = {
  colorMode: 'system' | 'dark' | 'light';
  colorTheme: 'default';
};

//UserApis
export type UserGetSingleAPI = {
  Params: {
    id: string;
  };
  Querystring?: {
    full?: boolean;
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

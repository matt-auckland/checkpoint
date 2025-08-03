import type { ObjectId } from 'mongodb';
import type { Team, TeamLite } from './TeamTypes';
import type { CheckInFull } from './CheckinTypes';

export type User = {
  _id: ObjectId;
  email: string;
  fullName: string;
  settings: UserSettings;
  teams: TeamLite[];
  recentCheckIns?: CheckInFull[];
  checkInHistory?: CheckInFull[];
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

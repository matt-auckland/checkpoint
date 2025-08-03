import type { ObjectId } from 'mongodb';
import type { CheckInFull, CheckInWithFullName } from './CheckinTypes';
import type { UserLite } from './UserTypes';

export type Team = {
  _id: ObjectId | string;
  name: string;
  members: UserLite[];
  latestCheckIns: CheckInFull[];
  checkIns: CheckInFull[];
};

export type TeamLite = Omit<
  Team,
  'members' | 'latestCheckIns' | 'checkIns'
>;

export type NewTeamData = Omit<Team, '_id'>;

// We don't direct editing of latestCheckIns
// as that is fetched from the db when loading a team
export type TeamUpdateData = Omit<
  Team,
  'latestCheckIns' | '_id'
  >;

export type TeamDataFull = Omit<Team, 'latestCheckIns'| 'checkIns'> & {
  latestCheckIns: CheckInWithFullName[]
  checkIns: CheckInWithFullName[]
}


export type TeamGetSingleAPI = {
  Params: {
    id: string;
  };
  Querystring?: {
    date?: string;
  };
};

export type TeamUpdateSingleAPI = {
  Params: {
    id: ObjectId;
  };
  Body: {
    patchData: TeamUpdateData;
  };
};

export type TeamUpdateAddUsersAPI = {
  Params: {
    teamId: string;
  };
  Body: {
    UserIds: string[]
  }
};

export type TeamDeleteUserAPI = {
  Params: {
    teamId: string;
    userId: string
  };
};

export type TeamCreateAPI = {
  Body: {
    user: UserLite;
  };
};

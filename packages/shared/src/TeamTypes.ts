import type { ObjectId } from 'mongodb';
import type { StandupEntryFull } from './StandupTypes';
import type { UserLite } from './UserTypes';

export type Team = {
  _id: ObjectId | string;
  name: string;
  members: UserLite[];
  standupHistory: StandUpHistory;
  latestCheckIns: StandupEntryFull[];
};

export type TeamLite = Omit<
  Team,
  'members' | 'standupHistory' | 'latestCheckIns'
>;

export type NewTeamData = Omit<Team, '_id'>;

// We don't direct editing of standupHistory or latestCheckIns
// as we automically update these based on various operations
export type TeamUpdateData = Omit<
  Team,
  'standupHistory' | 'latestCheckIns' | '_id'
>;

type StandUpHistory = {
  [date: string]: string;
};

export type TeamGetSingleAPI = {
  Params: {
    id: string;
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

export type TeamCreateAPI = {
  Body: {
    user: UserLite;
  };
};

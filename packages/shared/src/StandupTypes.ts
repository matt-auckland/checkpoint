import type { ObjectId } from 'mongodb';

export type Standup = {
  _id: ObjectId | string;
  team: string;
};

export type StandUpWithEntries = Standup & {
  entries: StandupEntryFull[];
};

export type NewStandupData = {
  team: string;
};

export type StandupEntryBase = {
  userId: string;
  standupId: string;
  date: Date;
  yesterday: string;
  today: string;
  blockers: string;
};

export type StandupEntryFull = StandupEntryBase & {
  _id: ObjectId | string;
};

export type StandupEntryWithName = StandupEntryFull & {
  fullName: string;
};

export type NewStandupEntry = Omit<StandupEntryBase, 'date'>;

export type StandupGetSingleAPI = {
  Params: {
    id: string;
  };
  Querystring: {
    full?: string | boolean;
  };
};

export type StandupCreateStandupAPI = {
  Params: {
    teamId: string;
  };
  Body: { entry: NewStandupEntry };
};

export type StandupCreateEntryAPI = {
  Params: {
    standupId: string;
  };
  Body: {
    entry: NewStandupEntry;
  };
};

export type StandupUpdateEntryAPI = {
  Body: {
    entry: StandupEntryFull;
  };
};

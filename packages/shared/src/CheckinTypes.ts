import type { ObjectId } from 'mongodb';

export type CheckInBase = {
  teamId: string;
  userId: string;
  yesterday: string;
  today: string;
  blockers: string;
};

export type CheckInInsert = CheckInBase & {
  createdAt: Date;
  updatedAt: Date;
};

export type CheckInFull = CheckInBase & {
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId | string;
};

export type CheckInWithFullName = CheckInFull & {
  fullName: string;
};

export type NewCheckInEntry = Omit<CheckInBase, 'date'>;

export type CheckInGetMultipleAPI = {
  Querystring: {
    teamId?: string;
    userId?: string;
    date?: string;
  };
};

export type CheckInGetSingleAPI = {
  Params: {
    id: string;
  };
};

export type CheckInCreateAPI = {
  Body: NewCheckInEntry;
};

export type CheckInUpdateEntryAPI = {
  Body: {
    checkIn: CheckInFull;
  };
};

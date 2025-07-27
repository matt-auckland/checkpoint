export type Standup = {
  _id: string;
  team: string;
  entries: StandupEntry[];
};

export type StandupEntry = {
  _id: string;
  userId: string;
  yesterday: string;
  today: string;
  blockers: string;
  date: Date;
};

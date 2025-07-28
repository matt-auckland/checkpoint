declare namespace NodeJS {
  interface ProcessEnv {
    FRONTEND_ORIGIN: string;
    PORT: number;
    MONGO_DB_URI: string;
    DB_NAME: string;
    USER_COLLECTION_NAME: string;
    STANDUP_COLLECTION_NAME: string;
    STANDUP_ENTRY_COLLECTION_NAME: string;
    TEAM_COLLECTION_NAME: string;
  }
}

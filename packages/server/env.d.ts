declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_URI: string;
    DB_NAME: string;
    USER_COLLECTION_NAME: string;
    STANDUP_COLLECTION_NAME: string;
    TEAM_COLLECTION_NAME: string;
  }
}

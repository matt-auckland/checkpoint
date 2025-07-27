import { MongoClient, Db, Collection } from 'mongodb';
import * as dotenv from 'dotenv';

type dbCollections = {
  user?: Collection;
  standup?: Collection;
  team?: Collection;
};

export const collections: dbCollections = {};

export async function connectToDB(): Promise<void> {
  try {
    dotenv.config();

    const envData = process.env;

    const uri = process.env.MONGO_DB_URI;
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(uri);
    await client.connect();

    let db: Db = client.db(dbName);

    const userCollection: Collection = db.collection(
      envData.USER_COLLECTION_NAME
    );
    collections.user = userCollection;
    const teamCollection: Collection = db.collection(
      envData.TEAM_COLLECTION_NAME
    );
    collections.team = teamCollection;
    const standUpCollection: Collection = db.collection(
      envData.STANDUP_COLLECTION_NAME
    );
    collections.standup = standUpCollection;

    console.log('connected to mongodb successfully');
  } catch (e) {
    console.error('Error connecting to Monogo');
    console.error(e);
  }
}

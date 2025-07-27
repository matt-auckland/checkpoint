import {
  MongoClient,
  Db,
  Collection,
  type WithId,
  type Document,
  ObjectId,
  type DeleteResult,
  type UpdateResult,
} from 'mongodb';
import * as dotenv from 'dotenv';

type DbCollections = {
  user?: CollectionWrapper;
  standup?: CollectionWrapper;
  team?: CollectionWrapper;
};

export const collections: DbCollections = {};

export async function connectToDB(): Promise<void> {
  try {
    dotenv.config();

    const envData = process.env;

    const uri = process.env.MONGO_DB_URI;
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(uri);
    await client.connect();

    let db: Db = client.db(dbName);
    const userCollection = db.collection(envData.USER_COLLECTION_NAME);
    collections.user = new CollectionWrapper(userCollection);

    const teamCollection = db.collection(envData.TEAM_COLLECTION_NAME);
    collections.team = new CollectionWrapper(teamCollection);

    const standupCollection = db.collection(envData.STANDUP_COLLECTION_NAME);
    collections.standup = new CollectionWrapper(standupCollection);

    console.log('connected to mongodb successfully');
  } catch (e) {
    console.error('Error connecting to Monogo');
    console.error(e);
  }
}
class CollectionWrapper {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async getAllDocuments(): Promise<WithId<Document>[]> {
    return await this.collection.find({}).toArray();
  }

  async getSingleDocument(id: string): Promise<WithId<Document> | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async patchDocument(id: string, newData: any): Promise<UpdateResult> {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newData }
    );
  }

  async deleteDocument(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

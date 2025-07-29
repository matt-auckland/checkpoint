import {
  MongoClient,
  Db,
  Collection,
  type WithId,
  type Document,
  ObjectId,
  type DeleteResult,
  type UpdateResult,
  type InsertOneResult,
} from 'mongodb';

type DbCollections = {
  user?: CollectionWrapper;
  standup?: CollectionWrapper;
  standupEntry?: CollectionWrapper;
  team?: CollectionWrapper;
};

export const collections: DbCollections = {};

export async function connectToDB(): Promise<void> {
  try {
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

    const standupEntryCollection = db.collection(
      envData.STANDUP_ENTRY_COLLECTION_NAME
    );
    collections.standupEntry = new CollectionWrapper(standupEntryCollection);

    console.log('connected to mongodb successfully');
  } catch (e) {
    console.error('Error connecting to Monogo');
    console.error(e);
  }
}
export class CollectionWrapper {
  public collection: Collection; //ideally this would be private?

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async getAllDocuments(): Promise<WithId<Document>[]> {
    return await this.collection.find({}).toArray();
  }

  async getDocumentById(
    id: string | ObjectId
  ): Promise<WithId<Document> | null> {
    return await this.getDocumentByField('_id', new ObjectId(id));
  }

  async getDocumentByField(
    fieldName: string,
    fieldValue: any
  ): Promise<WithId<Document> | null> {
    return await this.collection.findOne({ [fieldName]: fieldValue });
  }

  async getDocumentsByField(
    fieldName: string,
    fieldValue: any
  ): Promise<WithId<Document>[]> {
    return await this.collection.find({ [fieldName]: fieldValue }).toArray();
  }

  async updateDocument(
    id: string | ObjectId,
    newData: any
  ): Promise<UpdateResult> {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newData }
    );
  }

  async deleteDocument(id: string | ObjectId): Promise<DeleteResult> {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async createDocument(documentData: any): Promise<InsertOneResult> {
    return await this.collection.insertOne(documentData);
  }

  async getDocumentWithAggregation(
    id: string | ObjectId,
    pipeline: object[]
  ): Promise<Document | null> {
    const fullPipeline = [{ $match: { _id: new ObjectId(id) } }, ...pipeline];
    const results = await this.collection.aggregate(fullPipeline).toArray();
    return results[0] ?? null;
  }
}

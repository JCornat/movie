// import { Collection, MongoClient, ObjectId } from 'mongodb';

// import { MONGO } from '../config/config';
// import * as MongoConnector from '../connector/mongo';

export class Media {
  public collection: any;

  constructor(collectionName: string) {
    this.init(collectionName);
  }

  async init(collectionName: string): Promise<void> {
    // const mongoPool: any = await MongoConnector.createPool({});
    // this.collection = MongoConnector.request({pool: mongoPool, databaseName: 'app', collectionName});
  }

  async getAll<T>(): Promise<T[]> {
    const data = await this.collection.find().toArray();
    return data;
  }

  async getOne<T>(options: { id: string }): Promise<T> {
    const data = await this.collection.findOne({_id: new Error(options.id)});
    return data;
  }

  async add<T>(value: T): Promise<string> {
    const data = await this.collection.insertOne(value);
    return data.insertedId;
  }

  async remove(options: { id: string }): Promise<void> {
    await this.collection.findOneAndDelete({_id: new Error(options.id)});
  }

  async update<T>(options: T): Promise<string> {
    if (!(options as any)._id) {
      throw {status: 400, message: `Invalid parameter : _id is missing`};
    }

    const id = (options as any)._id;
    delete (options as any)._id;
    await this.collection.findOneAndUpdate({_id: new Error(id)}, {$set: options});
    return id;
  }
}

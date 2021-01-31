import { MONGO } from '../config/config';
import * as MongoConnector from '../connector/mongo';
import { MongoClient, ObjectId } from 'mongodb';

let mongoPool: MongoClient;
let collection;

export async function init() {
  mongoPool = await MongoConnector.createPool(MONGO);
  collection = MongoConnector.request({pool: mongoPool, databaseName: 'app', collectionName: 'movie'});
}

export async function getAll(options: any): Promise<any> {
  const data = await collection.find().toArray();
  return data;
}

export async function getOne(options: any): Promise<any> {
  const data = await collection.findOne({_id: new ObjectId(options.id)});
  return data;
}

export async function add(options: any): Promise<any> {
  const data = await collection.insertOne(options);
  return data.insertId;
}

export async function remove(options: any): Promise<any> {
  await collection.findOneAndDelete({_id: new ObjectId(options.id)});
}

export async function update(options: any): Promise<any> {
  const id = options._id;
  delete options._id;
  await collection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: options});
  return id;
}

import { MongoClient, ObjectId } from 'mongodb';
import * as path from 'path';
import { v4 as UUID } from 'uuid';

import { MONGO } from '../config/config';
import * as MongoConnector from '../connector/mongo';
import * as Config from '../config/config';
import * as File from './file';

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
  if (options.url) {
    const extensionName = path.extname(options.url).toLowerCase();
    const filename = `${UUID()}${extensionName}`;
    const url = path.join(Config.UPLOAD_PATH, filename);
    await File.download(options.url, url);
    options.backgroundImage = `${Config.URL}/upload/${filename}`;
  }

  const insertValue = {
    title: options.title,
    year: options.year,
    backgroundImage: options.backgroundImage,
    rating: options.rating,
    tags: options.tags,
  };

  const data = await collection.insertOne(insertValue);
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

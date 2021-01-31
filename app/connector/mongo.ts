import { Collection, MongoClient, MongoClientOptions } from 'mongodb';

import * as Global from '../model/global';

let collectionObj;

export function connect(config: { host: string, port: number, user: string, password: string, database: string, poolSize?: number }): { url: string, database: string, options: MongoClientOptions } {
  if (!Global.isEmpty(config.poolSize)) {
    config.poolSize = 10;
  }

  const res = {
    url: `mongodb://${config.host}:${config.port}/admin`,
    database: config.database,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: config.poolSize,
      user: null,
      password: null,
    },
  };

  if(config.user && config.password) {
    res.options.user = config.user;
    res.options.password = config.password;
  }

  return res;
}

export function createPool(data: any): Promise<MongoClient> {
  return new Promise((resolve, reject) => {
    const configuration = connect(data);

    MongoClient.connect(configuration.url, configuration.options, (error, client) => {
      if (error) {
        console.error('Failed connexion to server', error);
        return reject(error);
      }

      resolve(client);
    });
  });
}

export function request(options: { pool: MongoClient, databaseName: string, collectionName: string }): Collection {
  const collectionCache = Global.getNestedObjectKey(collectionObj, options.databaseName, options.collectionName);

  if (collectionCache) {
    return collectionCache;
  }

  if (collectionObj === undefined) {
    collectionObj = {};
  }

  const db = options.pool.db(options.databaseName);
  const collection = db.collection(options.collectionName);

  if (collectionObj[options.databaseName] === undefined) {
    collectionObj[options.databaseName] = {};
  }

  collectionObj[options.databaseName][options.collectionName] = collection;
  return collection;
}

import { v4 as UUID } from 'uuid';
import * as moment from 'moment';
import * as path from 'path';
import * as request from 'request';

import { Store } from '@class/store';
import * as Config from '@config/config';
import * as Http from './http';

export interface Game {
  _id?: string;
  title: string;
  year: number;
  backgroundImage: string;
  rating: number;
  tags: string;
}

let store: Store<Game>;
let bearer: string;

export async function init() {
  store = new Store('game');
}

export function getAll(): Game[] {
  return store.getAll();
}

export function getOne(id: string): Game {
  return store.getOne(id);
}

export async function add(options: { title: string, year: number, url: string, backgroundImage: string, rating: number, tags: string }): Promise<string> {
  if (options.url) {
    const extensionName = path.extname(options.url).toLowerCase();
    const filename = `${UUID()}${extensionName}`;
    const url = path.join(Config.UPLOAD_PATH, filename);
    await Http.download(options.url, url);
    options.backgroundImage = `${Config.URL}/upload/${filename}`;
  }

  const insertValue: Game = {
    title: options.title,
    year: options.year,
    backgroundImage: options.backgroundImage,
    rating: options.rating,
    tags: options.tags,
  };

  return store.add(insertValue);
}

export async function remove(id: string): Promise<void> {
  await store.remove(id);
}

export async function update(id: string, data: Game): Promise<void> {
  await store.update(id, data);
}

export function search(title: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }[]> {
  return new Promise(async (resolve, reject) => {
    try {
      await checkBearer();
    } catch (error) {
      reject(error);
    }

    const options = {
      url: `https://api.igdb.com/v4/games`,
      body: `
        fields cover.image_id,name,first_release_date;
        search "${title}";
      `,
      headers: {
        'Client-ID': Config.TWITCH_CLIENT.id,
        'Authorization': `Bearer ${bearer}`,
      }
    };

    request.post(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const res = processSearch(JSON.parse(body));
      resolve(res);
    });
  });
}

function processSearch(data: any[]): { id: number, title: string, year: number, backgroundImage: string }[] {
  const res = [];
  for (const datum of data) {
    const backgroundImage = (datum.cover?.image_id) ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${datum.cover.image_id}.jpg` : '';
    const year = (datum.first_release_date) ? moment(datum.first_release_date, 'X').format('YYYY') : '';
    const tmp = {
      id: datum.id,
      title: datum.name,
      year,
      backgroundImage,
    };

    res.push(tmp);
  }

  return res;
}

export function importOne(id: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      await checkBearer();
    } catch (error) {
      reject(error);
    }

    const options = {
      url: `https://api.igdb.com/v4/games`,
      body: `
        fields cover.image_id,name,first_release_date;
        where id = ${id};
      `,
      headers: {
        'Client-ID': Config.TWITCH_CLIENT.id,
        'Authorization': `Bearer ${bearer}`,
      }
    };

    request.post(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const res = processSearch(JSON.parse(body));
      resolve(res[0]);
    });
  });
}

export async function checkBearer(): Promise<void> {
  if (!bearer) {
    const authentication = await authenticate();
    bearer = authentication.access_token;

    setTimeout(() => {
      bearer = null;
    }, authentication.expires_in);
  }
}

export function authenticate(): Promise<{ access_token: string, expires_in: number, token_type: string }> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://id.twitch.tv/oauth2/token?client_id=${Config.TWITCH_CLIENT.id}&client_secret=${Config.TWITCH_CLIENT.secret}&grant_type=client_credentials`,
    };

    request.post(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve(JSON.parse(body));
    });
  });
}

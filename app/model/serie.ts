import * as request from 'request';

import { ImportMedia, Media, Rating, Store } from '@class/store';
import * as Config from '@config/config';
import { Global } from '@model/global';

// tslint:disable-next-line:no-empty-interface
export interface Serie extends Media {
  //
}

let store: Store<Serie>;

export async function init(): Promise<void> {
  store = new Store('serie');
  await store.init();
}

export function getAll(): Serie[] {
  return store.getAll();
}

export function getOne(id: string): Serie {
  return store.getOne(id);
}

export async function add(options: { title: string, year: number, rating: Rating, url?: string, [key: string]: any }): Promise<string> {
  return await store.add(options);
}

export async function remove(id: string): Promise<void> {
  await store.remove(id);
}

export async function update(id: string, data: Serie): Promise<void> {
  await store.update(id, data);
}

export function search(title: string): Promise<ImportMedia[]> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/search/tv?api_key=${Config.MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`,
    };

    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const res = processSearch(JSON.parse(body).results);
      resolve(res);
    });
  });
}

function processSearch(data: any[]): ImportMedia[] {
  const res = [];
  if (Global.isEmpty(data)) {
    return res;
  }

  for (const datum of data) {
    const year = (datum.first_air_date) ? (datum.first_air_date.split('-'))?.[0] : '';
    const url = (datum.poster_path) ? `https://image.tmdb.org/t/p/w300${datum.poster_path}` : '';
    const tmp = {
      importId: datum.id + '',
      title: datum.name,
      year: +year,
      url,
    };

    res.push(tmp);
  }

  return res;
}

export function importOne(id: string): Promise<ImportMedia> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/tv/${id}?api_key=${Config.MOVIEDB_API_KEY}`,
    };

    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const res = processSearch([JSON.parse(body)]);
      resolve(res[0]);
    });
  });
}

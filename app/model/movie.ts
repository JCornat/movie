import * as request from 'request';

import { Media, Store } from '@class/store';
import * as Config from '@config/config';

// tslint:disable-next-line:no-empty-interface
export interface Movie extends Media {
  //
}

let store: Store<Movie>;

export async function init(): Promise<void> {
  store = new Store('movie');
  await store.init();
}

export function getAll(): Movie[] {
  return store.getAll();
}

export function getOne(id: string): Movie {
  return store.getOne(id);
}

export async function add(options: { title: string, year: number, rating: number | 'todo', backgroundImage?: string, url?: string, [key: string]: any }): Promise<string> {
  return store.add(options);
}

export async function remove(id: string): Promise<void> {
  await store.remove(id);
}

export async function update(id: string, data: Movie): Promise<void> {
  await store.update(id, data);
}

export function search(title: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }[]> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/search/movie?api_key=${Config.MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`,
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

function processSearch(data: any[]): { id: number, title: string, year: number, backgroundImage: string }[] {
  const res = [];
  for (const datum of data) {
    const year = (datum.release_date) ? (datum.release_date.split('-'))?.[0] : '';
    const backgroundImage = (datum.poster_path) ? `https://image.tmdb.org/t/p/w300${datum.poster_path}` : '';
    const tmp = {
      id: datum.id,
      title: datum.title,
      year,
      backgroundImage,
    };

    res.push(tmp);
  }

  return res;
}

export function importOne(id: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${Config.MOVIEDB_API_KEY}`,
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

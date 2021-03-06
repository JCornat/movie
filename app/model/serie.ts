import * as path from 'path';
import * as request from 'request';
import { v4 as UUID } from 'uuid';

import * as Config from '../config/config';
import * as File from './file';
import { Media } from '../class/media';

export interface Serie {
  _id?: string;
  title: string;
  year: number;
  backgroundImage: string;
  rating: number;
  tags: string;
}

let media: Media;

export async function init() {
  media = new Media('serie');
}

export async function getAll(): Promise<Serie[]> {
  return media.getAll();
}

export async function getOne(options: { id: string }): Promise<Serie> {
  return media.getOne(options);
}

export async function add(options: { title: string, year: number, url: string, backgroundImage: string, rating: number, tags: string }): Promise<string> {
  if (options.url) {
    const extensionName = path.extname(options.url).toLowerCase();
    const filename = `${UUID()}${extensionName}`;
    const url = path.join(Config.UPLOAD_PATH, filename);
    await File.download(options.url, url);
    options.backgroundImage = `${Config.URL}/upload/${filename}`;
  }

  const insertValue: Serie = {
    title: options.title,
    year: options.year,
    backgroundImage: options.backgroundImage,
    rating: options.rating,
    tags: options.tags,
  };

  return await media.add(insertValue);
}

export async function remove(options: { id: string }): Promise<void> {
  await media.remove(options);
}

export async function update(options: Serie): Promise<string> {
  return await media.update(options);
}

export function search(title: string): Promise<{ title: string, year: number, backgroundImage: string }[]> {
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

function processSearch(data: any[]): { id: number, title: string, year: number, backgroundImage: string }[] {
  const res = [];
  for (const datum of data) {
    const year = (datum.first_air_date) ? (datum.first_air_date.split('-'))?.[0] : '';
    const backgroundImage = (datum.poster_path) ? `https://image.tmdb.org/t/p/w300${datum.poster_path}` : '';
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

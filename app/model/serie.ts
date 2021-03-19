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

export function search(title: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/search/tv?api_key=${Config.MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`,
    };

    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve(JSON.parse(body));
    });
  });
}

export function importOne(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.themoviedb.org/3/tv/${id}?api_key=${Config.MOVIEDB_API_KEY}`,
    };

    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve(JSON.parse(body));
    });
  });
}

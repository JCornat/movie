import path from 'node:path';

import { URL } from '@config/config';
import * as File from '@model/file';
import { Global } from '@model/global';
import * as Image from '@model/image';
import * as Random from '@model/random';

export type Rating = number | 'todo' | 'progress';

export interface Media {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  urlWebp?: string;
}

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export class Store<T> {
  collection: T;
  name: string;
  filePath: string;

  constructor(name: string) {
    if (Global.isEmpty(name)) {
      throw { status: 400, method: 'Store.constructor', message: `Paramètres invalides` };
    }

    this.name = name;
    this.filePath = path.join(__dirname, '..', 'config', `${this.name}.json`);
  }

  async init(): Promise<void> {
    let data = {};
    if (File.exists(this.filePath)) {
      const content = await File.read(this.filePath);
      const tmp = JSON.parse(content);
      data = Global.arrayToObject(tmp, 'id');
    }

    this.apply(data as T);
  }

  apply(data: T): void {
    this.collection = data;
  }

  async save(): Promise<void> {
    const scenes = Object.values(this.collection);
    await File.write(this.filePath, JSON.stringify(scenes));
  }

  getAll(): T[] {
    return Object.values(this.collection);
  }

  getOne(id: string): T {
    const res = this.collection[id];
    if (Global.isEmpty(res)) {
      throw { status: 500, method: 'Store.getOne', message: `Media not found` };
    }

    return res;
  }

  async add(data: { title: string, year: number, rating: Rating, url?: string, [key: string]: any }): Promise<string> {
    const id = Random.generate();

    if (data.url) {
      await Image.downloadAndConvert({ sourceUrl: data.url, basename: id, extensions: ['webp', 'jpg'] });
    }

    delete data.url;

    this.collection[id] = {
      ...data,
      id,
    };

    await this.save();
    return id;
  }

  async update(id: string, data: { title: string, year: number, rating: Rating, url?: string, [key: string]: any }): Promise<void> {
    this.getOne(id); // Get one to check if existing

    if (data.url && !data.url.includes(URL)) { // If url contains server url, no need to download
      await Image.downloadAndConvert({ sourceUrl: data.url, basename: id, extensions: ['webp', 'jpg'] });
    }

    delete data.url;

    this.collection[id] = {
      ...data,
      id,
    };

    await this.save();
  }

  async remove(id: string): Promise<void> {
    this.getOne(id); // Get one to check if existing
    delete this.collection[id];

    await Image.remove({ basename: id, extensions: ['webp', 'jpg'] });
    await this.save();
  }
}

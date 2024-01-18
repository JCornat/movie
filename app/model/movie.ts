import request from 'request';

import { Store } from '@model/store';
import * as Config from '@config/config';
import { Global } from '@model/global';
import { ImportMedia, IMovie, Rating } from '@model/definition';

export class Movie {
  static store: Store<IMovie>;

  static async init(): Promise<void> {
    this.store = new Store('movie');
    await this.store.init();
  }

  static getAll(): IMovie[] {
    return this.store.getAll();
  }

  static getOne(id: string): IMovie {
    return this.store.getOne(id);
  }

  static async add(options: { title: string, year: number, rating: Rating, url?: string, [key: string]: any }): Promise<string> {
    return await this.store.add(options);
  }

  static async remove(id: string): Promise<void> {
    await this.store.remove(id);
  }

  static async update(id: string, data: IMovie): Promise<void> {
    await this.store.update(id, data);
  }

  static search(title: string): Promise<ImportMedia[]> {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=${Config.MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`,
      };

      request.get(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        const res = this.processSearch(JSON.parse(body).results);
        resolve(res);
      });
    });
  }

  static processSearch(data: any[]): ImportMedia[] {
    const res = [];
    if (Global.isEmpty(data)) {
      return res;
    }

    for (const datum of data) {
      const year = (datum.release_date) ? (datum.release_date.split('-'))?.[0] : '';
      const url = (datum.poster_path) ? `https://image.tmdb.org/t/p/w300${datum.poster_path}` : '';
      const tmp = {
        importId: datum.id + '',
        title: datum.title,
        year: +year,
        url,
      };

      res.push(tmp);
    }

    return res;
  }

  static importOne(id: string): Promise<ImportMedia> {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${Config.MOVIEDB_API_KEY}`,
      };

      request.get(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        const res = this.processSearch([JSON.parse(body)]);
        resolve(res[0]);
      });
    });
  }
}

import request from 'request';

import * as Config from '@config/config';
import { Global } from '@model/global';
import { ImportMedia } from '@model/definition';
import { Media } from '@model/media';

export class Movie extends Media {
  async init(): Promise<void> {
    await this.createStore('movie');
  }

  override search(title: string): Promise<ImportMedia[]> {
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

  processSearch(data: any[]): ImportMedia[] {
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

  override importOne(id: string): Promise<ImportMedia> {
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

export const movie = new Movie();

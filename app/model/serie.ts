// import request from 'request';

import { Config } from '@config/config.ts';
import { Global } from '@model/global.ts';
import { ImportMedia } from '@model/definition.ts';
import { Media } from '@model/media.ts';

export class Serie extends Media {
  async init(): Promise<void> {
    await this.createStore('serie');
  }

  override async search(title: string): Promise<ImportMedia[]> {
    const options = {
      url: `https://api.themoviedb.org/3/search/tv?api_key=${Config.MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`,
    };

    const body = await fetch(options.url)

    return this.processSearch((body.body as any).results);
  }

  processSearch(data: any[]): ImportMedia[] {
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

  override importOne(id: string): Promise<ImportMedia> {
    return new Promise((resolve, reject) => {
      const options = {
        url: `https://api.themoviedb.org/3/tv/${id}?api_key=${Config.MOVIEDB_API_KEY}`,
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

export const serie = new Serie();

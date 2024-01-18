import request from 'request';

import { Store } from '@model/store';
import { time } from '@model/time';
import * as Config from '@config/config';
import { Global } from '@model/global';
import { IGame, ImportMedia, Rating } from '@model/definition';

export class Game {
  static store: Store<IGame>;
  static bearer: string;

  static async init(): Promise<void> {
    this.store = new Store('game');
    await this.store.init();
  }

  static getAll(): IGame[] {
    return this.store.getAll();
  }

  static getOne(id: string): IGame {
    return this.store.getOne(id);
  }

  static async add(options: { title: string, year: number, rating: Rating, url?: string, [key: string]: any }): Promise<string> {
    return await this.store.add(options);
  }

  static async remove(id: string): Promise<void> {
    await this.store.remove(id);
  }

  static async update(id: string, data: IGame): Promise<void> {
    await this.store.update(id, data);
  }

  static search(title: string): Promise<ImportMedia[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.checkBearer();
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
          Authorization: `Bearer ${this.bearer}`,
        },
      };

      request.post(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        const res = this.processSearch(JSON.parse(body));
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
      const url = (datum.cover?.image_id) ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${datum.cover.image_id}.jpg` : '';
      const year = (datum.first_release_date) ? time(datum.first_release_date, 'X').format('YYYY') : '';
      const tmp: ImportMedia = {
        importId: datum.id + '',
        title: datum.name,
        year: +year,
        url,
      };

      res.push(tmp);
    }

    return res;
  }

  static importOne(id: string): Promise<ImportMedia> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.checkBearer();
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
          Authorization: `Bearer ${this.bearer}`,
        },
      };

      request.post(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        const res = this.processSearch(JSON.parse(body));
        resolve(res[0]);
      });
    });
  }

  static async checkBearer(): Promise<void> {
    if (!this.bearer) {
      const authentication = await this.authenticate();
      this.bearer = authentication.access_token;

      setTimeout(() => {
        this.bearer = null;
      }, authentication.expires_in);
    }
  }

  static authenticate(): Promise<{ access_token: string, expires_in: number, token_type: string }> {
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
}

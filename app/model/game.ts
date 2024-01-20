import request from 'request';

import * as Config from '@config/config';
import { time } from '@model/time';
import { Global } from '@model/global';
import { ImportMedia } from '@model/definition';
import { Media } from '@model/media';

export class Game extends Media {
  bearer: string;

  async init(): Promise<void> {
    await this.createStore('game');
  }

  override search(title: string): Promise<ImportMedia[]> {
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

  processSearch(data: any[]): ImportMedia[] {
    const res = [];
    if (Global.isEmpty(data)) {
      return res;
    }

    for (const datum of data) {
      const url = (datum.cover?.image_id) ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${datum.cover.image_id}.jpg` : '';
      const unixTime = datum.first_release_date + '000';
      const year = (datum.first_release_date) ? time(+unixTime).format('YYYY') : '';
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

  override importOne(id: string): Promise<ImportMedia> {
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

  async checkBearer(): Promise<void> {
    if (!this.bearer) {
      const authentication = await this.authenticate();
      this.bearer = authentication.access_token;

      setTimeout(() => {
        this.bearer = null;
      }, authentication.expires_in);
    }
  }

  authenticate(): Promise<{ access_token: string, expires_in: number, token_type: string }> {
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

export const game = new Game();

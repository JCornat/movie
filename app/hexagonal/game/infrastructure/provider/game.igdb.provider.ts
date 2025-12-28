import { GameProvider, SearchItem } from '../../domain/provider/game.provider';
import { Config } from '@config/config';
import { Global } from '@model/global';
import { time } from '@model/time';

export class GameIgdbProvider implements GameProvider {
  private bearer: string | null = null;

  async fetchOne(importId: string): Promise<SearchItem> {
    await this.checkBearer();
    const response = await fetch(`https://api.igdb.com/v4/games`, {
      method: 'POST',
      headers: {
        'Client-ID': Config.TWITCH_CLIENT.id,
        'Authorization': `Bearer ${this.bearer}`,
      },
      body: `
        fields cover.image_id,name,first_release_date;
        where id = ${importId};
      `,
    });

    const data = await response.json();
    const items = this.processSearch(data);
    return items[0];
  }

  async search(title: string): Promise<SearchItem[]> {
    await this.checkBearer();
    const response = await fetch(`https://api.igdb.com/v4/games`, {
      method: 'POST',
      headers: {
        'Client-ID': Config.TWITCH_CLIENT.id,
        'Authorization': `Bearer ${this.bearer}`,
      },
      body: `
        fields cover.image_id,name,first_release_date;
        search "${title}";
      `,
    });

    const data = await response.json();
    return this.processSearch(data);
  }

  private processSearch(data: any[]): SearchItem[] {
    if (Global.isEmpty(data)) {
      return [];
    }

    return data.map((datum) => {
      const url = (datum.cover?.image_id) ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${datum.cover.image_id}.jpg` : '';
      const unixTime = datum.first_release_date + '000';
      const year = (datum.first_release_date) ? time(+unixTime).format('YYYY') : '';
      return {
        importId: datum.id + '',
        title: datum.name,
        year: +year,
        url,
      };
    });
  }

  private async checkBearer(): Promise<void> {
    if (!this.bearer) {
      const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${Config.TWITCH_CLIENT.id}&client_secret=${Config.TWITCH_CLIENT.secret}&grant_type=client_credentials`, {
        method: 'POST',
      });

      const data = await response.json();
      this.bearer = data.access_token;
      setTimeout(() => {
        this.bearer = null;
      }, data.expires_in);
    }
  }
}

export const defaultGameProvider = new GameIgdbProvider();

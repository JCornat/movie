import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Game } from './game';
import { ImportMedia } from '@app/media/media';
import { Request } from '@shared/request/request';
import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private requestService = inject(RequestService);

  public async pullAll(): Promise<Game[]> {
    const optionsQuery: Request = {
      url: `/api/game`,
      header: {
        disableAuthentication: true,
      },
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullAll(data);
  }

  public processPullAll(data: { data: Game[] }): Game[] {
    for (const datum of data.data) {
      datum.url = `${SERVER_URL}/upload/${datum.id}.jpg`;
      datum.urlWebp = `${SERVER_URL}/upload/${datum.id}.webp`;
    }

    return data.data;
  }

  public async pullOne(id: string): Promise<Game> {
    const optionsQuery = {
      url: `/api/game/${id}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullOne(data.data);
  }

  public processPullOne(data: Game): Game {
    const tmp = this.processPullAll({data: [data]});
    return tmp[0];
  }

  public async search(title: string): Promise<ImportMedia[]> {
    const optionsQuery = {
      url: `/api/game?search=${title}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  public async importOne(id: string): Promise<ImportMedia> {
    const optionsQuery = {
      url: `/api/game/${id}/import`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  public async update(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/game/${options.id}`,
      body: {
        ...options,
      },
    };

    await lastValueFrom(this.requestService.put(optionsQuery));
  }

  public async add(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/game`,
      body: {
        ...options,
      },
    };

    await lastValueFrom(this.requestService.post(optionsQuery));
  }

  public async delete(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/game/${id}`,
    };

    await lastValueFrom(this.requestService.delete(optionsQuery));
  }
}

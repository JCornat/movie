import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ImportMedia } from '@app/media/media';
import { Request } from '@shared/request/request';
import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';
import { Serie } from './serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  constructor(
    private requestService: RequestService,
  ) {
    //
  }

  public async pullAll(): Promise<Serie[]> {
    const optionsQuery: Request = {
      url: `/api/serie`,
      header: {
        disableAuthentication: true,
      },
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullAll(data);
  }

  public processPullAll(data: { data: Serie[] }): Serie[] {
    for (const datum of data.data) {
      datum.url = `${SERVER_URL}/upload/${datum.id}.jpg`;
      datum.urlWebp = `${SERVER_URL}/upload/${datum.id}.webp`;
    }

    return data.data;
  }

  public async pullOne(id: string): Promise<Serie> {
    const optionsQuery = {
      url: `/api/serie/${id}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullOne(data.data);
  }

  public processPullOne(data: Serie): Serie {
    const tmp = this.processPullAll({data: [data]});
    return tmp[0];
  }

  public async search(title: string): Promise<ImportMedia[]> {
    const optionsQuery = {
      url: `/api/serie?search=${title}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  public async importOne(id: string): Promise<ImportMedia> {
    const optionsQuery = {
      url: `/api/serie/${id}/import`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  public async update(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/serie/${options.id}`,
      body: {
        ...options,
      },
    };

    await lastValueFrom(this.requestService.put(optionsQuery));
  }

  public async add(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/serie`,
      body: {
        ...options,
      },
    };

    await lastValueFrom(this.requestService.post(optionsQuery));
  }

  public async delete(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/serie/${id}`,
    };

    await lastValueFrom(this.requestService.delete(optionsQuery));
  }
}

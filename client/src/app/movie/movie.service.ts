import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ImportMedia, Media } from '@app/media/media';
import { Movie } from './movie';
import { Request } from '@shared/request/request';
import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';
import { MediaService } from '@app/media/media.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends MediaService  {
  requestService = inject(RequestService);

  async pullAll(): Promise<Movie[]> {
    const optionsQuery: Request = {
      url: `/api/movie`,
      header: {
        disableAuthentication: true,
      },
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullAll(data);
  }

  processPullAll(data: { data: Movie[] }): Movie[] {
    for (const datum of data.data) {
      datum.url = `${SERVER_URL}/upload/${datum.id}.jpg`;
      datum.urlWebp = `${SERVER_URL}/upload/${datum.id}.webp`;
    }

    return data.data;
  }

  async pullOne(id: string): Promise<Movie> {
    const optionsQuery = {
      url: `/api/movie/${id}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return this.processPullOne(data.data);
  }

  processPullOne(data: Movie): Movie {
    const tmp = this.processPullAll({data: [data]});
    return tmp[0];
  }

  async search(title: string): Promise<ImportMedia[]> {
    const optionsQuery = {
      url: `/api/movie?search=${title}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  async importOne(id: string): Promise<ImportMedia> {
    const optionsQuery = {
      url: `/api/movie/${id}/import`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  async update(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/movie/${options.id}`,
      body: {
        ...options,
      },
    };

    const result = await lastValueFrom(this.requestService.put(optionsQuery));
    if( !result || result.status !== 200)
      return;

    this.updateMedia(options);
  }

  async add(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/movie`,
      body: {
        ...options,
      },
    };

    const result = await lastValueFrom(this.requestService.post(optionsQuery));
    if( !result || result.data == null)
    return;

    const id = result.data;
    this.addMedia({...options,id} as Media);
  }

  async delete(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/movie/${id}`,
    };

    const result = await lastValueFrom(this.requestService.delete(optionsQuery));
    if( !result || result.status !== 200)
      return;

    this.removeMedia(id);
  }
}

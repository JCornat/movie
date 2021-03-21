import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Request } from '../request/request';
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

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async pullOne(id: string): Promise<any> {
    const optionsQuery = {
      url: `/api/serie/${id}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async search(title: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }[]> {
    const optionsQuery = {
      url: `/api/serie?search=${title}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async importOne(id: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }> {
    const optionsQuery = {
      url: `/api/serie/${id}/import`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async update(options: any): Promise<void> {
    const optionsQuery = {
      url: `/api/serie/${options._id}`,
      body: {
        ...options,
      },
    };

    await this.requestService.put(optionsQuery).toPromise();
  }

  public async add(options): Promise<void> {
    const optionsQuery = {
      url: `/api/serie`,
      body: {
        ...options,
      },
    };

    await this.requestService.post(optionsQuery).toPromise();
  }

  public async delete(id): Promise<void> {
    const optionsQuery = {
      url: `/api/serie/${id}`,
    };

    await this.requestService.delete(optionsQuery).toPromise();
  }
}

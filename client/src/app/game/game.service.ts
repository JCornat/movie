import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { Request } from '@shared/request/request';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private requestService: RequestService,
  ) {
    //
  }

  public async pullAll(): Promise<Game[]> {
    const optionsQuery: Request = {
      url: `/api/game`,
      header: {
        disableAuthentication: true,
      },
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async pullOne(id: string): Promise<any> {
    const optionsQuery = {
      url: `/api/game/${id}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async search(title: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }[]> {
    const optionsQuery = {
      url: `/api/game?search=${title}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async importOne(id: string): Promise<{ id: number, title: string, year: number, backgroundImage: string }> {
    const optionsQuery = {
      url: `/api/game/${id}/import`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async update(options: any): Promise<void> {
    const optionsQuery = {
      url: `/api/game/${options._id}`,
      body: {
        ...options,
      },
    };

    await this.requestService.put(optionsQuery).toPromise();
  }

  public async add(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/game`,
      body: {
        ...options,
      },
    };

    await this.requestService.post(optionsQuery).toPromise();
  }

  public async delete(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/game/${id}`,
    };

    await this.requestService.delete(optionsQuery).toPromise();
  }
}

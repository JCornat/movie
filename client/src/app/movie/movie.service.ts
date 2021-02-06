import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIE_URL } from '../config/config';
import { RequestService } from '../request/request.service';
import { Request } from '../request/request';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private requestService: RequestService,
  ) {
    //
  }

  public async pullAll(): Promise<Movie[]> {
    const optionsQuery: Request = {
      url: `${MOVIE_URL}/api/movie`,
      header: {
        disableAuthentication: true,
      },
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async pullOne(id: string): Promise<any> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie/${id}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async search(title: string): Promise<any> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie?search=${title}`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async importOne(id: string): Promise<any> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie/${id}/import`,
    };

    const data: any = await this.requestService.get(optionsQuery).toPromise();
    return data.data;
  }

  public async update(options: any): Promise<void> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie/${options._id}`,
    };

    await this.requestService.put(optionsQuery).toPromise();
  }

  public async add(options): Promise<void> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie`,
    };

    await this.requestService.post(optionsQuery).toPromise();
  }

  public async delete(id): Promise<void> {
    const optionsQuery = {
      url: `${MOVIE_URL}/api/movie/${id}`,
    };

    await this.requestService.delete(optionsQuery).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie';
import { MOVIE_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: HttpClient,
  ) {
    //
  }

  public async pullAll(): Promise<Movie[]> {
    const data: any = await this.http.get(`${MOVIE_URL}/api/movie`).toPromise();
    return data.data;
  }

  public async pullOne(id: string): Promise<any> {
    const data: any = await this.http.get(`${MOVIE_URL}/api/movie/${id}`).toPromise();
    return data.data;
  }

  public async search(title: string): Promise<any> {
    const data: any = await this.http.get(`${MOVIE_URL}/api/movie?search=${title}`).toPromise();
    return data.data;
  }

  public async importOne(id: string): Promise<any> {
    const data: any = await this.http.get(`${MOVIE_URL}/api/movie/${id}/import`).toPromise();
    return data.data;
  }

  public async update(options: any): Promise<void> {
    await this.http.put(`${MOVIE_URL}/api/movie/${options._id}`, options).toPromise();
  }

  public async add(options): Promise<void> {
    await this.http.post(`${MOVIE_URL}/api/movie`, options).toPromise();
  }

  public async delete(id): Promise<void> {
    await this.http.delete(`${MOVIE_URL}/api/movie/${id}`).toPromise();
  }
}

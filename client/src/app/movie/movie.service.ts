import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private http: HttpClient,
  ) {
    //
  }

  public async pullAll(): Promise<any[]> {
    const data: any = await this.http.get(`http://localhost:3000/api/movie`).toPromise();
    console.log('data', data.data);
    return data.data;
  }

  public async pullOne(id): Promise<any> {
    const data: any = await this.http.get(`http://localhost:3000/api/movie/${id}`).toPromise();
    return data.data;
  }

  public async update(options): Promise<void> {
    await this.http.put(`http://localhost:3000/api/movie/${options._id}`, options).toPromise();
  }

  public async add(options): Promise<void> {
    await this.http.post(`http://localhost:3000/api/movie`, options).toPromise();
  }

  public async delete(id): Promise<void> {
    await this.http.delete(`http://localhost:3000/api/movie/${id}`).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public movies = [
    {id: 1, title: 'Jeu de la Dame', year: 2020, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
    {id: 2, title: 'A la poursuite de demain', year: 2015, rating: 5, backgroundImage: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/i6d08LRgS4g4sdl2qcZgLjeLNdH.jpg'},
  ];

  constructor(
    private http: HttpClient,
  ) {
    //
  }

  public async pullAll(): Promise<any[]> {
    const data: any = await this.http.get(`http://localhost:3000/api/movie`).toPromise();
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

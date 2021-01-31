import { Injectable } from '@angular/core';

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

  constructor() { }
}

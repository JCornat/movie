import { Component, OnInit } from '@angular/core';
import { Question } from '../question/question';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movies: { id: number, title: string, rating: number, year: number, backgroundImage: string }[];
  public questions: Question[] = [
    {key: 'id', type: 'number', label: 'id'},
    {key: 'title', type: 'text', label: 'title'},
    {key: 'year', type: 'number', label: 'year'},
    {key: 'backgroundImage', type: 'text', label: 'image'},
    {key: 'rating', type: 'number', label: 'rating'},
  ];

  public values: any;

  constructor() {
    //
  }

  public ngOnInit(): void {
    this.pullAll();
  }

  public pullAll(): void {
    this.movies = [
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

    this.values = this.movies[1];
  }

  public valid(data): void {
    this.movies[1] = data;
  }
}

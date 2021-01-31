import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movies: { id: number, title: string, rating: number, year: number, backgroundImage: string }[];

  constructor(
    private movieService: MovieService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.pullAll();
  }

  public pullAll(): void {
    this.movies = this.movieService.movies;
  }
}

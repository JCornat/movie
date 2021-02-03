import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movies: { _id: string, title: string, rating: number, year: number, backgroundImage: string }[];

  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    this.pullAll();
  }

  public async pullAll(): Promise<void> {
    this.movies = await this.movieService.pullAll();
  }

  public detail(data): void {
    this.router.navigate(['/update', data._id]);
  }

  public navigateAdd(): void {
    this.router.navigate(['/add']);
  }
}

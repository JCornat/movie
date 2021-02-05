import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movies: { label: string, limit: number, list: { _id: string, title: string, rating: number, year: number, backgroundImage: string }[] }[];

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
    const movies = await this.movieService.pullAll();
    this.movies = this.processMovies(movies);
  }

  public detail(data): void {
    this.router.navigate(['/update', data._id]);
  }

  public navigateAdd(): void {
    this.router.navigate(['/add']);
  }

  public navigateSearch(): void {
    this.router.navigate(['/search']);
  }

  public processMovies(data: { _id: string, title: string, rating: number, year: number, backgroundImage: string }[]): { label: string, limit: number, list: { _id: string, title: string, rating: number, year: number, backgroundImage: string }[] }[] {
    const favourites = {label: 'Favourites', limit: 20, list: []};
    const exceptional = {label: 'Excellents', limit: 20, list: []};
    const good = {label: 'Goods', limit: 10, list: []};
    const mediocre = {label: 'Mediocres', limit: 10, list: []};
    const bad = {label: 'Bads', limit: 10, list: []};
    const todo = {label: 'Todos', limit: 20, list: []};

    for (const datum of data) {
      if (!datum.rating) {
        todo.list.push(datum);
      } else if (datum.rating >= 5) {
        favourites.list.push(datum);
      } else if (datum.rating >= 4) {
        exceptional.list.push(datum);
      } else if (datum.rating >= 3) {
        good.list.push(datum);
      } else if (datum.rating >= 2) {
        mediocre.list.push(datum);
      } else if (datum.rating >= 0) {
        bad.list.push(datum);
      } else {
        console.error('rating not supported', datum);
      }
    }

    this.shuffle(favourites.list);
    this.shuffle(exceptional.list);
    this.shuffle(good.list);
    this.shuffle(mediocre.list);
    this.shuffle(bad.list);
    this.shuffle(todo.list);

    return [
      favourites,
      exceptional,
      good,
      mediocre,
      bad,
      todo,
    ];
  }

  public shuffle(array): any {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public increaseLimit(item: { label: string, limit: number, list: { _id: string, title: string, rating: number, year: number, backgroundImage: string }[] }): void {
    item.limit += 20;
  }
}

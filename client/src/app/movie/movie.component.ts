import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';
import { Category } from './category';
import { Movie } from './movie';
import * as Global from '../global/global';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public categories: Category[];

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
    this.categories = this.processCategories(movies);
  }

  public processCategories(data: Movie[]): Category[] {
    const favourites: Category = {label: 'Favourites', limit: 19, orderBy: 'random', movies: []};
    const exceptional: Category = {label: 'Excellents', limit: 19, orderBy: 'random', movies: []};
    const good: Category = {label: 'Goods', limit: 9, orderBy: 'random', movies: []};
    const mediocre: Category = {label: 'Mediocres', limit: 9, orderBy: 'random', movies: []};
    const bad: Category = {label: 'Bads', limit: 9, orderBy: 'random', movies: []};
    const todo: Category = {label: 'Todos', limit: 19, orderBy: 'random', movies: []};

    for (const datum of data) {
      if (!datum.rating) {
        todo.movies.push(datum);
      } else if (datum.rating >= 5) {
        favourites.movies.push(datum);
      } else if (datum.rating >= 4) {
        exceptional.movies.push(datum);
      } else if (datum.rating >= 3) {
        good.movies.push(datum);
      } else if (datum.rating >= 2) {
        mediocre.movies.push(datum);
      } else if (datum.rating >= 0) {
        bad.movies.push(datum);
      } else {
        console.error('rating not supported', datum);
      }
    }

    this.shuffle(favourites.movies);
    this.shuffle(exceptional.movies);
    this.shuffle(good.movies);
    this.shuffle(mediocre.movies);
    this.shuffle(bad.movies);
    this.shuffle(todo.movies);

    return [
      favourites,
      exceptional,
      good,
      mediocre,
      bad,
      todo,
    ];
  }

  public shuffle(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public increaseLimit(item: Category): void {
    item.limit += 50;
  }

  public sort(item: Category, type: string): void {
    item.orderBy = type;

    if (type === 'random') {
      this.shuffle(item.movies);
      return;
    }

    const key = (type === 'alphabetic') ? 'title' : 'year';
    item.movies = Global.sort({data: item.movies, key});
  }
}

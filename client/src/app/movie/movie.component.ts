import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';
import { Category } from './category';
import { Movie } from './movie';
import * as Global from '../global/global';
import { ScreenService } from '../screen/screen.service';
import { Subscription } from 'rxjs';
import { Question } from '../question/question';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnDestroy {
  public questions: Question[];
  public displayList: Category[];
  public categories: Category[];
  public searchCategories: Category[];
  public resizeSubscriber: Subscription;
  public formData: { [key: string]: any };
  public movies: Movie[];
  public isLogged: boolean;

  constructor(
    public authenticationService: AuthenticationService,
    public movieService: MovieService,
    public router: Router,
    public screenService: ScreenService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.isLogged = this.authenticationService.isLogged();
    this.subscribeResize();
    this.buildQuestions();
    this.pullAll();
  }

  public ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  public async pullAll(): Promise<void> {
    this.movies = await this.movieService.pullAll();
    this.categories = this.processCategories(this.movies);
    this.processDisplayList();
  }

  public processDisplayList(): void {
    this.displayList = (this.formData?.search) ? this.searchCategories : this.categories;
  }

  public processCategories(data: Movie[], search?: string): Category[] {
    const limit = this.getLimitByScreenSize();
    const favourites: Category = {label: 'Favourites', limit, orderBy: 'random', movies: []};
    const exceptional: Category = {label: 'Excellents', limit, orderBy: 'random', movies: []};
    const good: Category = {label: 'Goods', limit, orderBy: 'random', movies: []};
    const mediocre: Category = {label: 'Mediocres', limit, orderBy: 'random', movies: []};
    const bad: Category = {label: 'Bads', limit, orderBy: 'random', movies: []};
    const todo: Category = {label: 'Todos', limit, orderBy: 'random', movies: []};

    for (const datum of data) {
      if (search) {
        if (!(datum.year + '').includes(search) && !(datum.title.toLowerCase()).includes(search.toLowerCase())) {
          continue;
        }
      }

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

  public getLimitByScreenSize(): number {
    if (this.screenService.isMobile()) {
      return 5;
    } else if (this.screenService.isTablet()) {
      return 8;
    } else if (this.screenService.isLaptop()) {
      return 8;
    } else if (this.screenService.isDesktop()) {
      return 11;
    } else if (this.screenService.isWidescreen()) {
      return 17;
    }
  }

  public increaseLimit(item: Category): void {
    item.limit += 25;
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

  public subscribeResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable.subscribe(() => {
      if (Global.isEmpty(this.categories)) {
        return;
      }

      for (const category of this.categories) {
        category.limit = this.getLimitByScreenSize();
      }
    });
  }

  public buildQuestions(): void {
    this.questions = [
      {key: 'search', type: 'text', placeholder: 'Search', marginBottom: 0},
    ];
  }

  public onValid(data): void {
    this.formData = data;
    this.searchCategories = this.processCategories(this.movies, data.search);
    this.processDisplayList();
  }

  public navigateSearch(): void {
    this.router.navigate(['/search']);
  }

  public navigateUpdate(movie: Movie): void {
    if (!this.isLogged) {
      return;
    }

    this.router.navigate(['/update', movie._id]);
  }
}

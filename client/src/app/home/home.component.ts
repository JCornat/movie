import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CategoryPreview, Game, Medium, Movie, Serie } from '@app/interface';
import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterModule, SharedModule],
})
export class HomeComponent implements OnInit {
  gameService = inject(GameService);
  movieService = inject(MovieService);
  router = inject(Router);
  serieService = inject(SerieService);

  readonly categoriesPreview: Signal<CategoryPreview[]> = this.computeCategoriesPreview();
  readonly movies: Signal<Movie[]> = this.computeMovies();
  readonly series: Signal<Serie[]> = this.computeSeries();
  readonly games: Signal<Game[]> = this.computeGames();

  ngOnInit(): void {
    this.movieService.pullAll();
    this.serieService.pullAll();
    this.gameService.pullAll();
  }

  //region Template
  selectCategory(media: { title: string, url: string }): void {
    this.router.navigate([media.url]);
  }
  //endregion

  //region Method
  filterMedia(media: Medium[]): Medium[] {
    media.sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }

      if (a.rating < b.rating) {
        return 1;
      }

      return 0;
    });

    const limit = media.splice(0, 50); // Take first 50
    this.shuffle(limit);
    return limit.splice(0, 25); // Display first 25
  }

  shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  //endregion

  //region Compute
  computeCategoriesPreview(): Signal<CategoryPreview[]> {
    return computed(() => {
      return [
        {
          title: 'Movies',
          description: `Keep track of my favourites movies.`,
          url: '/movie',
          media: this.movies(),
        },
        {
          title: 'Series',
          description: `Follow my preferred series.`,
          url: '/serie',
          media: this.series(),
        },
        {
          title: 'Games',
          description: `Explore my dearest games.`,
          url: '/game',
          media: this.games(),
        },
      ] as CategoryPreview[];
    });
  }

  computeMovies() {
    return computed(() => {
      const media = this.movieService.valuesPullAll() as Movie[];
      return this.filterMedia(media || []);
    });
  }

  computeSeries() {
    return computed(() => {
      const media = this.serieService.valuesPullAll() as Serie[];
      return this.filterMedia(media || []);
    });
  }

  computeGames() {
    return computed(() => {
      const media = this.gameService.valuesPullAll() as Game[];
      return this.filterMedia(media || []);
    });
  }
  //endregion
}

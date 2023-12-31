import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Game, Media, MediaListElement, Movie, Serie } from '@app/interface';
import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule],
})
export class HomeComponent implements OnInit {
  mediaList!: MediaListElement[];
  movies: WritableSignal<Movie[]> = signal([]);
  series: WritableSignal<Serie[]> = signal([]);
  games: WritableSignal<Game[]> = signal([]);
  gameService = inject(GameService);
  movieService = inject(MovieService);
  router = inject(Router);
  serieService = inject(SerieService);

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.buildMediaList();
    this.pullAllMovies();
    this.pullAllSeries();
    this.pullAllGames();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  selectMedia(media: { title: string, url: string }): void {
    this.router.navigate([media.url]);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async pullAllMovies(): Promise<void> {
    const data = await this.movieService.pullAll();
    const processedData = this.processMedia(data);
    this.movies.set(processedData);
  }

  async pullAllSeries(): Promise<void> {
    const data = await this.serieService.pullAll();
    const processedData = this.processMedia(data);
    this.series.set(processedData);
  }

  async pullAllGames(): Promise<void> {
    const data = await this.gameService.pullAll();
    const processedData = this.processMedia(data);
    this.games.set(processedData);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  buildMediaList(): void {
    this.mediaList = [
      {
        title: 'Movies',
        description: `Keep track of my favourites movies.`,
        url: '/movie',
        data: this.movies,
      },
      {
        title: 'Series',
        description: `Follow my preferred series.`,
        url: '/serie',
        data: this.series,
      },
      {
        title: 'Games',
        description: `Explore my dearest games.`,
        url: '/game',
        data: this.games,
      },
    ];
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  processMedia(media: Media[]): Media[] {
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
}

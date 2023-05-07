import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { Media } from '@app/media/media';
import { Movie } from '@app/movie/movie';
import { MovieService } from '@app/movie/movie.service';
import { Serie } from '@app/serie/serie';
import { SerieService } from '@app/serie/serie.service';

interface MediaListElement {
  title: string;
  description: string;
  url: string;
  data: WritableSignal<Movie[] | Serie[] | Game[]>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
})
export class HomeComponent implements OnInit {
  public mediaList!: MediaListElement[];
  public movies: WritableSignal<Movie[]> = signal([]);
  public series: WritableSignal<Serie[]> = signal([]);
  public games: WritableSignal<Game[]> = signal([]);
  public gameService = inject(GameService);
  public movieService = inject(MovieService);
  public router = inject(Router);
  public serieService = inject(SerieService);

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.buildMediaList();
    this.pullAllMovies();
    this.pullAllSeries();
    this.pullAllGames();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public trackByFn(index: number, data: MediaListElement): string {
    return data.title;
  }

  public selectMedia(media: { title: string, url: string }): void {
    this.router.navigate([media.url]);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAllMovies(): Promise<void> {
    const data = await this.movieService.pullAll();
    const processedData = this.processMedia(data);
    this.movies.set(processedData);
  }

  public async pullAllSeries(): Promise<void> {
    const data = await this.serieService.pullAll();
    const processedData = this.processMedia(data);
    this.series.set(processedData);
  }

  public async pullAllGames(): Promise<void> {
    const data = await this.gameService.pullAll();
    const processedData = this.processMedia(data);
    this.games.set(processedData);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public buildMediaList(): void {
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

  public processMedia(media: Media[]): Media[] {
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

  public shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

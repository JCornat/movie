import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { Media } from '@app/media/media';
import { Movie } from '@app/movie/movie';
import { MovieService } from '@app/movie/movie.service';
import { Serie } from '@app/serie/serie';
import { SerieService } from '@app/serie/serie.service';

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
  public mediaList!: { title: string, description: string, url: string, data: any[] }[];
  public movies!: Movie[];
  public series!: Serie[];
  public games!: Game[];
  public gameService = inject(GameService);
  public movieService = inject(MovieService);
  public router = inject(Router);
  public serieService = inject(SerieService);

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.movies = [];
    this.series = [];
    this.games = [];

    this.pullAllMovies();
    this.pullAllSeries();
    this.pullAllGames();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public selectMedia(media: { title: string, url: string }): void {
    this.router.navigate([media.url]);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAllMovies(): Promise<void> {
    const data = await this.movieService.pullAll();
    this.movies = this.processMedia(data);
    this.updateMedia();
  }

  public async pullAllSeries(): Promise<void> {
    const data = await this.serieService.pullAll();
    this.series = this.processMedia(data);
    this.updateMedia();
  }

  public async pullAllGames(): Promise<void> {
    const data = await this.gameService.pullAll();
    this.games = this.processMedia(data);
    this.updateMedia();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public updateMedia(): void {
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

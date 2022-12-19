import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie/movie.service';
import { SerieService } from '../serie/serie.service';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public mediaList!: { title: string, description: string, url: string, data: any[] }[];
  public movies!: any[];
  public series!: any[];
  public games!: any[];

  constructor(
    public gameService: GameService,
    public movieService: MovieService,
    public router: Router,
    public serieService: SerieService,
  ) {
    //
  }

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

  public processMedia(media: any[]): any[] {
    media.sort((a, b) => {
      if (a.rating === '') {
        return -1;
      }

      if (b.rating === '') {
        return -1;
      }

      if (a.rating > b.rating) {
        return -1;
      }

      if (a.rating < b.rating) {
        return 1;
      }

      if (a.title > b.title) {
        return 1;
      }

      if (a.title < b.title) {
        return -1;
      }

      return 0;
    });

    return media.splice(0, 25);
  }
}

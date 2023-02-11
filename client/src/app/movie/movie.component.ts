import { Component } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './movie';
import { ScreenService } from '@shared/screen/screen.service';
import { MediaComponent } from "@app/media/media.component";
import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Game } from '@app/game/game';
// import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-movie',
  templateUrl: '../media/media.component.html',
})
export class MovieComponent extends MediaComponent {
  public override media!: Movie[];

  constructor(
    public override authenticationService: AuthenticationService,
    public movieService: MovieService,
    public override router: Router,
    public override screenService: ScreenService,
  ) {
    super(authenticationService, router, screenService);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public override navigateUpdate(movie: Movie): void {
    if (!this.isLogged) {
      return;
    }

    this.router.navigate(['/movie', movie.id, 'update']);
  }

  public override navigateSearch(game: Game): void {
    if (!this.isLogged) {
      return;
    }

    this.router.navigate(['/movie', 'search']);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.movieService.pullAll();
    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

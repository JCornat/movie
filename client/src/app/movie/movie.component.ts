import { Component } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';
import { Movie } from './movie';
import { ScreenService } from '@shared/screen/screen.service';
import { MediaComponent } from "@app/media/media.component";
import { AuthenticationService } from '@shared/authentication/authentication.service';

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
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.movieService.pullAll();
    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

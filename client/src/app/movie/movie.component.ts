import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { Movie } from '@app/movie/movie';
import { MovieService } from '@app/movie/movie.service';
import { ScreenService } from '@shared/screen/screen.service';

@Component({
  selector: 'app-movie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    MediaItemComponent,
    NgClass,
    NgFor,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
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
    this.shuffle(this.media);

    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

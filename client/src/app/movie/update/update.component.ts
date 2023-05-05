import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { Movie } from '@app/movie/movie';
import { MovieService } from '@app/movie/movie.service';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    MediaItemComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  constructor(
    public movieService: MovieService,
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<Movie> {
    return this.movieService.pullOne(this.id);
  }

  public override async remove(): Promise<void> {
    await this.movieService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.movieService.update(data);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaUpdateComponent } from '../../media/update/update.component';
import { RequestService } from '@shared/request/request.service';
import { Movie } from '@app/movie/movie';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
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

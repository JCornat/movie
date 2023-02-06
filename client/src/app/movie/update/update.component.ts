import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaUpdateComponent } from '../../media/update/update.component';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/update/update.component.html',
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  constructor(
    public movieService: MovieService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<void> {
    this.values = await this.movieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.movieService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.movieService.update(data);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/movie']);
  }
}

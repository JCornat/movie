import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediumUpdateComponent } from '../../medium/update/update.component';

@Component({
  selector: 'movie-update',
  templateUrl: '../../medium/update/update.component.html',
})
export class MovieUpdateComponent extends MediumUpdateComponent {
  public id: string;

  constructor(
    public movieService: MovieService,
    public router: Router,
    public route: ActivatedRoute,
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

  public async update(data): Promise<void> {
    await this.movieService.update(data);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/movie']);
  }
}

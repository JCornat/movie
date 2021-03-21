import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaUpdateComponent } from '../../media/update/update.component';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/update/update.component.html',
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  public id: string;

  constructor(
    public movieService: MovieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
  }

  public async pullOne(id: string): Promise<void> {
    this.values = await this.movieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.movieService.delete(this.id);
    this.router.navigate(['/']);
  }

  public async update(data): Promise<void> {
    await this.movieService.update(data);
  }
}

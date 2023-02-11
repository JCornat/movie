import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaAddComponent } from '../../media/add/add.component';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
})
export class MovieAddComponent extends MediaAddComponent {
  constructor(
    public movieService: MovieService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.movieService.add(this.formData);
  }
}

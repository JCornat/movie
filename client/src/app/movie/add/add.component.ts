import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaAddComponent } from '../../media/add/add.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
})
export class MovieAddComponent extends MediaAddComponent {
  constructor(
    public movieService: MovieService,
    public override requestService: RequestService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public override async add(): Promise<void> {
    await this.movieService.add(this.formData);
  }
}

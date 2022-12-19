import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaAddComponent } from '../../media/add/add.component';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
})
export class MovieAddComponent extends MediaAddComponent {
  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.movieService.add(this.formData);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/movie']);
  }
}

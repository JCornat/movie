import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'media-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class MovieAddComponent extends MediumAddComponent {
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

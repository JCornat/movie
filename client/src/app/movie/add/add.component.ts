import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../../question/question';
import { MovieService } from '../movie.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'media-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class MovieAddComponent extends MediumAddComponent {
  public questions: Question[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
    super();
  }

  public async onSubmit(): Promise<void> {
    await this.movieService.add(this.formData);
    this.router.navigate(['/']);
  }
}

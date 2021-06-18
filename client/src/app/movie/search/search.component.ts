import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { Question } from '../../question/question';
import { MediumSearchComponent } from '../../medium/search/search.component';

@Component({
  selector: 'movie-search',
  templateUrl: '../../medium/search/search.component.html',
})
export class MovieSearchComponent extends MediumSearchComponent {
  public questions: Question[];
  public results: { title: string, year: number, backgroundImage: string }[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async search(title: string): Promise<any> {
    this.results = await this.movieService.search(title);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/movie']);
  }

  public navigateAdd(): void {
    this.router.navigate(['/movie/add']);
  }

  public navigateImport(id: string): void {
    this.router.navigate(['/movie/import', id]);
  }
}

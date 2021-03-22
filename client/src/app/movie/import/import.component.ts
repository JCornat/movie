import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediumImportComponent } from '../../medium/import/import.component';

@Component({
  selector: 'movie-import',
  templateUrl: '../../medium/import/import.component.html',
})
export class MovieImportComponent extends MediumImportComponent implements OnInit {
  constructor(
    public movieService: MovieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
  }

  public async pullOne(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    const data = await this.movieService.importOne(id);
    this.posterImage = data.backgroundImage;

    return {
      title: data.title,
      year: data.year,
      url: data.backgroundImage,
    };
  }

  public async onSubmit(): Promise<void> {
    if (this.loadingAdd) {
      return;
    }

    this.errorAdd = null;
    this.loadingAdd = true;

    try {
      await this.movieService.add(this.formData);
      this.router.navigate(['/movie/search']);
    } catch (error) {
      this.errorAdd = error;
    } finally {
      this.loadingAdd = false;
    }
  }
}

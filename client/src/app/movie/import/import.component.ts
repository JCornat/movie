import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from '../movie.service';
import { MediaImportComponent } from '../../media/import/import.component';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/import/import.component.html',
})
export class MovieImportComponent extends MediaImportComponent implements OnInit {
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

  public async add(): Promise<void> {
    await this.movieService.add(this.formData);
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
}

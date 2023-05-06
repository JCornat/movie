import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { MovieService } from '@app/movie/movie.service';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'movie-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class MovieSearchComponent extends MediaSearchComponent {
  constructor(
    public movieService: MovieService,
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public override async search(title: string): Promise<void> {
    this.error = null as any;
    this.loading = true;

    try {
      this.searchResults = await this.movieService.search(title);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }
}

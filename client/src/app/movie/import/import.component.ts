import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ImportMedia } from '@app/media/media';
import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    MediaItemComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class MovieImportComponent extends MediaImportComponent implements OnInit {
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

  public override async add(): Promise<void> {
    await this.movieService.add(this.formData);
  }

  public async pullOne(id: string): Promise<ImportMedia> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    this.error = null as any;
    this.loading = true;

    let data: any;

    try {
      data = await this.movieService.importOne(id);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }

    return data;
  }
}

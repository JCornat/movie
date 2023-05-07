import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ImportMedia } from '@app/media/media';
import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
  ],
})
export class MovieImportComponent extends MediaImportComponent implements OnInit {
  public movieService = inject(MovieService);

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

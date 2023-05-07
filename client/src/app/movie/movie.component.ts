import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { Movie } from '@app/movie/movie';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class MovieComponent extends MediaComponent {
  public override media!: Movie[];
  public movieService = inject(MovieService);

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.movieService.pullAll();
    this.shuffle(this.media);

    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

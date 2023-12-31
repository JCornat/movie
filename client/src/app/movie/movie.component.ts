import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { CategoryComponent } from '@app/category/category.component';
import { FilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Movie } from '@app/interface';
import { ListComponent } from '@app/media/list/list.component';

@Component({
  selector: 'app-movie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    CategoryComponent,
    FilterComponent,
    MediaMoreComponent,
    ListComponent,
  ],
})
export class MovieComponent extends MediaComponent {
  override media!: Movie[];
  override mediaService = inject(MovieService);
}

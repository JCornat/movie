import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { CategoryComponent } from '@app/category/category.component';
import { MediaFilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Movie } from '@app/interface';
import { MediaListComponent } from '@app/media/list/list.component';
import { MovieSearchComponent } from '@app/movie/search/search.component';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { MovieUpdateComponent } from '@app/movie/update/update.component';

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
    MediaFilterComponent,
    MediaMoreComponent,
    MediaListComponent,
  ],
})
export class MovieComponent extends MediaComponent {
  override media!: Movie[];
  override mediaService = inject(MovieService);

  override getSearchComponent(): any {
    return MovieSearchComponent;
  }

  override getAddComponent(): any {
    return MovieAddComponent;
  }

  override getUpdateComponent(): any {
    return MovieUpdateComponent;
  }
}

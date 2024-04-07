import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { CategoryComponent } from '@app/category/category.component';
import { MediaFilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Movie } from '@app/interface';
import { MediaListComponent } from '@app/media/list/list.component';
import { MovieSearchComponent } from '@app/movie/search/search.component';
import { MovieUpdateComponent } from '@app/movie/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SharedModule,
    MediaItemComponent,
    NgOptimizedImage,
    RouterModule,
    CategoryComponent,
    MediaFilterComponent,
    MediaMoreComponent,
    MediaListComponent,
  ],
})
export class MovieComponent extends MediaComponent<Movie> {
  override media!: Movie[];
  override mediaService: MovieService = inject(MovieService);

  override getSearchComponent(): any {
    return MovieSearchComponent;
  }

  override getUpdateComponent(): any {
    return MovieUpdateComponent;
  }
}

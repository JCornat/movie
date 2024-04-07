import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieImportComponent } from '@app/movie/import/import.component';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { Movie } from '@app/interface';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'movie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieSearchComponent extends MediaSearchComponent<Movie> {
  mediaService = inject(MovieService);

  override getImportComponent(): any {
    return MovieImportComponent;
  }

  override getAddComponent(): any {
    return MovieAddComponent;
  }
}

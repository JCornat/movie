import { Component, inject } from '@angular/core';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { MovieService } from '@app/movie/movie.service';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieImportComponent } from '@app/movie/import/import.component';
import { MovieAddComponent } from '@app/movie/add/add.component';

@Component({
  selector: 'movie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieSearchComponent extends MediaSearchComponent {
  mediaService = inject(MovieService);

  override getImportComponent(): any {
    return MovieImportComponent;
  }

  override getAddComponent(): any {
    return MovieAddComponent;
  }
}

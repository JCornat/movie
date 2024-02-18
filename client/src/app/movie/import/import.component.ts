import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { Movie } from '@app/interface';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieImportComponent extends MediaImportComponent<Movie> implements OnInit {
  constructor(
    movieService: MovieService,
  ) {
    super(movieService);
  }
}

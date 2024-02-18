import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { Movie } from '@app/interface';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieUpdateComponent extends MediaUpdateComponent<Movie> {
  constructor(
    movieService: MovieService,
  ) {
    super(movieService);
  }
}

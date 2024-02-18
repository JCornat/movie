import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { MovieService } from '@app/movie/movie.service';
import { Movie } from '@app/interface';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaItemComponent, SharedModule],
})
export class MovieAddComponent extends MediaAddComponent<Movie> {
  constructor(movieService: MovieService) {
    super(movieService);
  }
}

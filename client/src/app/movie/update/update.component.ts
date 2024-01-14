import { Component, inject } from '@angular/core';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { MovieService } from '@app/movie/movie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  mediaService = inject(MovieService);
}

import { Component, inject } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [MediaItemComponent, SharedModule],
})
export class MovieAddComponent extends MediaAddComponent {
  mediaService = inject(MovieService);
}

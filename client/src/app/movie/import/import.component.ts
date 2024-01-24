import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieImportComponent extends MediaImportComponent implements OnInit {
  constructor(
    movieService: MovieService,
  ) {
    super(movieService);
  }
}

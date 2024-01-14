import { Component, inject, OnInit } from '@angular/core';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'movie-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class MovieImportComponent extends MediaImportComponent implements OnInit {
  mediaService = inject(MovieService);
}

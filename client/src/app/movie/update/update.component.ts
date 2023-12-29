import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [CommonModule, MediaItemComponent, ReactiveFormsModule],
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  mediaService = inject(MovieService);
}

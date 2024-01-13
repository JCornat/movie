import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { MovieService } from '@app/movie/movie.service';
import { FormInputDirective } from '@shared/form-input/form-input.directive';

@Component({
  selector: 'movie-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
    FormInputDirective,
  ],
})
export class MovieUpdateComponent extends MediaUpdateComponent {
  mediaService = inject(MovieService);
}

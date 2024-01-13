import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { MovieService } from '@app/movie/movie.service';
import { FormInputDirective } from '@shared/form-input/form-input.directive';

@Component({
  selector: 'movie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputDirective],
})
export class MovieSearchComponent extends MediaSearchComponent {
  mediaService = inject(MovieService);
}

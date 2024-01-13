import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { SerieService } from '@app/serie/serie.service';
import { FormInputDirective } from '@shared/form-input/form-input.directive';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputDirective],
})
export class SerieSearchComponent extends MediaSearchComponent {
  mediaService = inject(SerieService);
}

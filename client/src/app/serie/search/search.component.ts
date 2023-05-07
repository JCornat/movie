import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SerieSearchComponent extends MediaSearchComponent {
  public mediaService = inject(SerieService);
}

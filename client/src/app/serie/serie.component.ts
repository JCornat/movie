import { Component, inject } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { Serie } from '@app/serie/serie';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SerieComponent extends MediaComponent {
  override media!: Serie[];
  override mediaService = inject(SerieService);
}

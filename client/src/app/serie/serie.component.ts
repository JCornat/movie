import { Component, inject } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';
import { CategoryComponent } from '@app/category/category.component';
import { FilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Serie } from '@app/interface';

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
    CategoryComponent,
    FilterComponent,
    MediaMoreComponent,
  ],
})
export class SerieComponent extends MediaComponent {
  override media!: Serie[];
  override mediaService = inject(SerieService);
}

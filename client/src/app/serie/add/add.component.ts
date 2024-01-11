import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [CommonModule, MediaItemComponent, ReactiveFormsModule],
})
export class SerieAddComponent extends MediaAddComponent {
  mediaService = inject(SerieService);
}

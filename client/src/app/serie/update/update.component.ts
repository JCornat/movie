import { Component, inject } from '@angular/core';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SerieService } from '@app/serie/serie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'serie-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieUpdateComponent extends MediaUpdateComponent {
  mediaService = inject(SerieService);
}

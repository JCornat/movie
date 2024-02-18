import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { Serie } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieUpdateComponent extends MediaUpdateComponent<Serie> {
  constructor(
    serieService: SerieService,
  ) {
    super(serieService);
  }
}

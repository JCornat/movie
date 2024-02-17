import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { Serie } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaItemComponent, SharedModule],
})
export class SerieAddComponent extends MediaAddComponent<Serie> {
  constructor(serieService: SerieService) {
    super(serieService);
  }
}

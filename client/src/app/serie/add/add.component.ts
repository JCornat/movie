import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaItemComponent, SharedModule],
})
export class SerieAddComponent extends MediaAddComponent {
  mediaService = inject(SerieService);
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { Serie } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieImportComponent extends MediaImportComponent<Serie> {
  constructor(
    gameService: SerieService,
  ) {
    super(gameService);
  }
}

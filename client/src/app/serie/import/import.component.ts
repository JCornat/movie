import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'serie-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieImportComponent extends MediaImportComponent implements OnInit {
  constructor(
    gameService: SerieService,
  ) {
    super(gameService);
  }
}

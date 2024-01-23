import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { GameService } from '@app/game/game.service';
import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'game-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameImportComponent extends MediaImportComponent implements OnInit {
  mediaService = inject(GameService);
}

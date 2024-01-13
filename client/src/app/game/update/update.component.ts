import { Component, inject } from '@angular/core';

import { GameService } from '@app/game/game.service';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class GameUpdateComponent extends MediaUpdateComponent {
  mediaService = inject(GameService);
}

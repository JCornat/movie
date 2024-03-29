import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GameService } from '@app/game/game.service';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameUpdateComponent extends MediaUpdateComponent {
  constructor(
    gameService: GameService,
  ) {
    super(gameService);
  }
}

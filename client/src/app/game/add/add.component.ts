import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GameService } from '@app/game/game.service';
import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameAddComponent extends MediaAddComponent {
  constructor(gameService: GameService) {
    super(gameService);
  }
}

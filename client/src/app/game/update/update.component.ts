import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { Game } from '@app/interface';
import { GameService } from '@app/game/game.service';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameUpdateComponent extends MediaUpdateComponent<Game> {
  constructor(
    gameService: GameService,
  ) {
    super(gameService);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { Game } from '@app/interface';
import { GameService } from '@app/game/game.service';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameAddComponent extends MediaAddComponent<Game> {
  constructor(gameService: GameService) {
    super(gameService);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SharedModule } from '@shared/shared.module';
import { Game } from '@app/interface';
import { GameService } from '@app/game/game.service';

@Component({
  selector: 'game-import',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameImportComponent extends MediaImportComponent<Game> implements OnInit {
  constructor(
    gameService: GameService,
  ) {
    super(gameService);
  }
}

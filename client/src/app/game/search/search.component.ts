import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MediaSearchComponent } from '@app/media/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';
import { GameImportComponent } from '@app/game/import/import.component';
import { GameAddComponent } from '@app/game/add/add.component';
import { Game } from '@app/interface';
import { GameService } from '@app/game/game.service';

@Component({
  selector: 'game-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class GameSearchComponent extends MediaSearchComponent<Game> {
  mediaService = inject(GameService);

  override getImportComponent(): any {
    return GameImportComponent;
  }

  override getAddComponent(): any {
    return GameAddComponent;
  }
}

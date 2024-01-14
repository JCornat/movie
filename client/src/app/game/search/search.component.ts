import { Component, inject } from '@angular/core';

import { GameService } from '@app/game/game.service';
import { MediaSearchComponent } from '@app/media/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';

@Component({
  selector: 'game-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class GameSearchComponent extends MediaSearchComponent {
  mediaService = inject(GameService);
}

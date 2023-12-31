import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MediaSearchComponent } from '@app/media/search/search.component';

@Component({
  selector: 'game-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class GameSearchComponent extends MediaSearchComponent {
  mediaService = inject(GameService);
}

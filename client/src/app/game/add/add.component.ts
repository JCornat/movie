import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  standalone: true,
  imports: [MediaItemComponent, ReactiveFormsModule],
})
export class GameAddComponent extends MediaAddComponent {
  mediaService = inject(GameService);
}

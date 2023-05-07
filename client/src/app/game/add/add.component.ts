import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
  ],
})
export class GameAddComponent extends MediaAddComponent {
  mediaService = inject(GameService);
}

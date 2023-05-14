import { Component, inject } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';

@Component({
  selector: 'app-game',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class GameComponent extends MediaComponent {
  override media!: Game[];
  override mediaService = inject(GameService);
}

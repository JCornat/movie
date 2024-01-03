import { Component, inject } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Game } from '@app/interface';
import { GameService } from '@app/game/game.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { CategoryComponent } from '@app/category/category.component';
import { MediaFilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { MediaListComponent } from '@app/media/list/list.component';

@Component({
  selector: 'app-game',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    CategoryComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    MediaFilterComponent,
    MediaMoreComponent,
    MediaListComponent,
  ],
})
export class GameComponent extends MediaComponent {
  override media!: Game[];
  override mediaService = inject(GameService);
}

import { Component, inject } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { ScreenService } from '@shared/screen/screen.service';

@Component({
  selector: 'app-game',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class GameComponent extends MediaComponent {
  public override media!: Game[];
  public gameService = inject(GameService);

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.gameService.pullAll();
    this.shuffle(this.media);

    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

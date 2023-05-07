import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
  ],
})
export class GameUpdateComponent extends MediaUpdateComponent {
  public gameService = inject(GameService);

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<Game> {
    return this.gameService.pullOne(this.id);
  }

  public override async remove(): Promise<void> {
    await this.gameService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.gameService.update(data);
  }
}

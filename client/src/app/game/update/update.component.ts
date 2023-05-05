import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    MediaItemComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class GameUpdateComponent extends MediaUpdateComponent {
  constructor(
    public gameService: GameService,
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(requestService, route, router);
  }

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

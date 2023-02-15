import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaUpdateComponent } from '../../media/update/update.component';
import { RequestService } from '@shared/request/request.service';
import { Game } from '@app/game/game';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
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

  public async remove(): Promise<void> {
    await this.gameService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.gameService.update(data);
  }
}

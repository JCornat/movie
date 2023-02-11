import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaUpdateComponent } from '../../media/update/update.component';

@Component({
  selector: 'game-update',
  templateUrl: '../../media/update/update.component.html',
})
export class GameUpdateComponent extends MediaUpdateComponent {
  constructor(
    public gameService: GameService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<void> {
    this.values = await this.gameService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.gameService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.gameService.update(data);
  }
}

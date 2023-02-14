import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaAddComponent } from '../../media/add/add.component';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
})
export class GameAddComponent extends MediaAddComponent {
  constructor(
    public gameService: GameService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.gameService.add(this.formData);
  }
}

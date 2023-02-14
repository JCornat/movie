import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaAddComponent } from '../../media/add/add.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'game-add',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
})
export class GameAddComponent extends MediaAddComponent {
  constructor(
    public gameService: GameService,
    public override requestService: RequestService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.gameService.add(this.formData);
  }
}

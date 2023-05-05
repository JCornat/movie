import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'game-add',
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

  public override async add(): Promise<void> {
    await this.gameService.add(this.formData);
  }
}

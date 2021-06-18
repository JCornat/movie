import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'game-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class GameAddComponent extends MediumAddComponent {
  constructor(
    public gameService: GameService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.gameService.add(this.formData);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/game']);
  }
}

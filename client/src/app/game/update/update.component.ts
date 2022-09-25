import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumUpdateComponent } from '../../medium/update/update.component';

@Component({
  selector: 'game-update',
  templateUrl: '../../medium/update/update.component.html',
})
export class GameUpdateComponent extends MediumUpdateComponent {
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

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/game']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumSearchComponent } from '../../medium/search/search.component';

@Component({
  selector: 'game-search',
  templateUrl: '../../medium/search/search.component.html',
})
export class GameSearchComponent extends MediumSearchComponent {
  constructor(
    public gameService: GameService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async search(title: string): Promise<any> {
    this.results = await this.gameService.search(title);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/game']);
  }

  public navigateAdd(): void {
    this.router.navigate(['/game/add']);
  }

  public navigateImport(id: string): void {
    this.router.navigate(['/game/import', id]);
  }
}

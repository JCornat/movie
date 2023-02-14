import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaSearchComponent } from '@app/media/search/search.component';

@Component({
  selector: 'game-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
})
export class GameSearchComponent extends MediaSearchComponent {
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

  public override async search(title: string): Promise<void> {
    this.searchResults = await this.gameService.search(title);
  }
}

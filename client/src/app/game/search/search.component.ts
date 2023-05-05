import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MediaSearchComponent } from '@app/media/search/search.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'game-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class GameSearchComponent extends MediaSearchComponent {
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

  public override async search(title: string): Promise<void> {
    this.error = null as any;
    this.loading = true;

    try {
      this.searchResults = await this.gameService.search(title);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }
}

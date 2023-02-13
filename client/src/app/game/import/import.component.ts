import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediaImportComponent } from '../../media/import/import.component';

@Component({
  selector: 'game-import',
  templateUrl: '../../media/add/add.component.html',
})
export class GameImportComponent extends MediaImportComponent implements OnInit {
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

  public async add(): Promise<void> {
    await this.gameService.add(this.formData);
  }

  public async pullOne(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    this.error = null as any;
    this.loading = true;

    let data: any;

    try {
      data = await this.gameService.importOne(id);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }

    this.posterImage = data.posterPath;

    return {
      title: data.title,
      year: data.year,
      url: data.posterPath,
    };
  }
}

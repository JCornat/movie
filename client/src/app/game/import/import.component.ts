import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumImportComponent } from '../../medium/import/import.component';

@Component({
  selector: 'game-import',
  templateUrl: '../../medium/import/import.component.html',
})
export class GameImportComponent extends MediumImportComponent implements OnInit {
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

    const data = await this.gameService.importOne(id);
    this.posterImage = data.backgroundImage;

    return {
      title: data.title,
      year: data.year,
      url: data.backgroundImage,
    };
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/game/search']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumImportComponent } from '../../medium/import/import.component';

@Component({
  selector: 'game-import',
  templateUrl: '../../medium/import/import.component.html',
})
export class GameImportComponent extends MediumImportComponent implements OnInit {
  public id: string;
  public posterImage: string;

  constructor(
    public gameService: GameService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
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

  public async onSubmit(): Promise<void> {
    await this.gameService.add(this.formData);
    this.router.navigate(['/game/search']);
  }
}

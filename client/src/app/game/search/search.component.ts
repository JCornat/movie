import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import { Question } from '../../question/question';
import { MediumSearchComponent } from '../../medium/search/search.component';

@Component({
  selector: 'game-search',
  templateUrl: '../../medium/search/search.component.html',
})
export class GameSearchComponent extends MediumSearchComponent {
  public questions: Question[];
  public results: { title: string, year: number, backgroundImage: string }[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public gameService: GameService,
    public router: Router,
  ) {
    super();
  }

  public async search(title: string): Promise<any> {
    this.results = await this.gameService.search(title);
  }

  public select(result: any): void {
    this.router.navigate(['/game/import', result.id]);
  }

  public navigateAdd(): void {
    this.router.navigate(['/game/add']);
  }
}

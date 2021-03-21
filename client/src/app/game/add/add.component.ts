import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../../question/question';
import { GameService } from '../game.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'game-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class GameAddComponent extends MediumAddComponent {
  public questions: Question[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public gameService: GameService,
    public router: Router,
  ) {
    super();
  }

  public async onSubmit(): Promise<void> {
    await this.gameService.add(this.formData);
    this.router.navigate(['/game']);
  }
}

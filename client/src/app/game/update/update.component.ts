import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { MediumUpdateComponent } from '../../medium/update/update.component';

@Component({
  selector: 'game-update',
  templateUrl: '../../medium/update/update.component.html',
})
export class GameUpdateComponent extends MediumUpdateComponent {
  public id: string;

  constructor(
    public gameService: GameService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
  }

  public async pullOne(id: string): Promise<void> {
    this.values = await this.gameService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.gameService.delete(this.id);
    this.router.navigate(['/game']);
  }

  public async update(data): Promise<void> {
    await this.gameService.update(data);
  }

  public async onSubmit(): Promise<void> {
    await this.update(this.formData);
    this.router.navigate(['/game']);
  }
}

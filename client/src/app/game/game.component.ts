import { Component } from '@angular/core';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { Game } from './game';
import { ScreenService } from '@shared/screen/screen.service';
import { MediaComponent } from "@app/media/media.component";
// import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-game',
  templateUrl: '../media/media.component.html',
})
export class GameComponent extends MediaComponent {
  public override media!: Game[];

  constructor(
    // public authenticationService: AuthenticationService,
    public gameService: GameService,
    public override router: Router,
    public override screenService: ScreenService,
  ) {
    super(router, screenService);
  }

  public async pullAll(): Promise<void> {
    this.media = await this.gameService.pullAll();
    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }

  public override navigateUpdate(game: Game): void {
    if (!this.isLogged) {
      return;
    }

    this.router.navigate(['/game', game.id, 'update']);
  }
}

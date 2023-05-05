import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Game } from '@app/game/game';
import { GameService } from '@app/game/game.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { ScreenService } from '@shared/screen/screen.service';

@Component({
  selector: 'app-game',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    MediaItemComponent,
    NgClass,
    NgFor,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class GameComponent extends MediaComponent {
  public override media!: Game[];

  constructor(
    public override authenticationService: AuthenticationService,
    public gameService: GameService,
    public override router: Router,
    public override screenService: ScreenService,
  ) {
    super(authenticationService, router, screenService);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.gameService.pullAll();
    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

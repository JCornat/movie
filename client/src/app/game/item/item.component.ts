import { Component, Input } from '@angular/core';

import { Game } from '@app/game/game';
import { MediaItemComponent } from '../../media/item/item.component';

@Component({
  selector: 'game-item',
  templateUrl: '../../media/item/item.component.html',
})
export class GameItemComponent extends MediaItemComponent {
  @Input() public override data!: Game;

  constructor() {
    super();
  }
}

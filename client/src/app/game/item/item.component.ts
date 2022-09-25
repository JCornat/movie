import { Component, Input } from '@angular/core';

import { Game } from '@app/game/game';
import { MediumItemComponent } from '../../medium/item/item.component';

@Component({
  selector: 'game-item',
  templateUrl: '../../medium/item/item.component.html',
})
export class GameItemComponent extends MediumItemComponent {
  @Input() public override data!: Game;

  constructor() {
    super();
  }
}

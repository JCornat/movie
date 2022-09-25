import { Component, Input } from '@angular/core';

import { MediumItemComponent } from '../../medium/item/item.component';
import { Serie } from '@app/serie/serie';

@Component({
  selector: 'serie-item',
  templateUrl: '../../medium/item/item.component.html',
})
export class SerieItemComponent extends MediumItemComponent {
  @Input() public override data!: Serie;

  constructor() {
    super();
  }
}

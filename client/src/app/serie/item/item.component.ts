import { Component, Input } from '@angular/core';

import { MediaItemComponent } from '../../media/item/item.component';
import { Serie } from '@app/serie/serie';

@Component({
  selector: 'serie-item',
  templateUrl: '../../media/item/item.component.html',
})
export class SerieItemComponent extends MediaItemComponent {
  @Input() public override data!: Serie;

  constructor() {
    super();
  }
}

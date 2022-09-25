import { Component, Input } from '@angular/core';

import { MediumItemComponent } from '../../medium/item/item.component';
import { Movie } from '@app/movie/movie';

@Component({
  selector: 'movie-item',
  templateUrl: '../../medium/item/item.component.html',
})
export class MovieItemComponent extends MediumItemComponent {
  @Input() public override data!: Movie;

  constructor() {
    super();
  }
}

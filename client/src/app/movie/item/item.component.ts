import { Component, Input } from '@angular/core';

import { MediaItemComponent } from '../../media/item/item.component';
import { Movie } from '@app/movie/movie';

@Component({
  selector: 'movie-item',
  templateUrl: '../../media/item/item.component.html',
})
export class MovieItemComponent extends MediaItemComponent {
  @Input() public override data!: Movie;

  constructor() {
    super();
  }
}

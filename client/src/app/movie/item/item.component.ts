import { Component, Input } from '@angular/core';
import { MediaItemComponent } from '../../media/item/item.component';

@Component({
  selector: 'movie-item',
  templateUrl: '../../media/item/item.component.html',
})
export class MovieItemComponent extends MediaItemComponent {
  @Input() public data: { _id: string, title: string, rating: number, year: number, backgroundImage: string };

  constructor() {
    super();
  }
}

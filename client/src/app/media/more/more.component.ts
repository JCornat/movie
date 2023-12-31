import { Component, Input } from '@angular/core';
import { Category } from '@app/interface';

@Component({
  selector: 'media-more',
  standalone: true,
  templateUrl: './more.component.html',
})
export class MediaMoreComponent {
  @Input({ required: true }) category!: Category;
}

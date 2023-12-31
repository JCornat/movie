import { Component, Input } from '@angular/core';
import { GroupMedium } from '@app/interface';

@Component({
  selector: 'media-more',
  standalone: true,
  templateUrl: './more.component.html',
})
export class MediaMoreComponent {
  @Input({ required: true }) category!: GroupMedium;
  @Input({ required: true }) limit!: number;
}

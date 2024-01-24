import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { Medium } from '@app/interface';

@Component({
  selector: 'media-item',
  templateUrl: './item.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, NgClass],
})
export class MediaItemComponent {
  data = input.required<Medium>();
  dynamic = input<boolean>();
}

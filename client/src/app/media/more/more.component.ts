import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Medium } from '@app/interface';

@Component({
  selector: 'media-more',
  templateUrl: './more.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class MediaMoreComponent {
  data = input.required<Medium>();
  limit = input.required<number>();
}

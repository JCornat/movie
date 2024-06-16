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
  readonly data = input.required<Medium>();
  readonly limit = input.required<number>();
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'media-more',
  templateUrl: './more.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class MediaMoreComponent {
  @Input({ required: true }) data!: { [key: string]: any };
  @Input({ required: true }) limit!: number;
}

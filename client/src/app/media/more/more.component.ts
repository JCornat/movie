import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'media-more',
  standalone: true,
  templateUrl: './more.component.html',
  imports: [NgOptimizedImage],
})
export class MediaMoreComponent {
  @Input({ required: true }) data!: { [key: string]: any };
  @Input({ required: true }) limit!: number;
}

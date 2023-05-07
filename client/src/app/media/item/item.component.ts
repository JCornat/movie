import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Media } from '@app/media/media';
import { SERVER_URL } from '@shared/config/config';
import * as Global from '@shared/global/global';

@Component({
  selector: 'media-item',
  templateUrl: './item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
})
export class MediaItemComponent implements OnInit {
  @Input() data!: { [key: string]: any };
  @Input() dynamic!: boolean; // Allow image update

  ngOnInit(): void {
    if (Global.isPopulated((this.data as Media).id)) { // For Media item
      const data = this.data as Media;
      data.url = `${SERVER_URL}/upload/${data.id}.jpg`;
      data.urlWebp = `${SERVER_URL}/upload/${data.id}.webp`;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { SERVER_URL } from '@shared/config/config';
import { ImportMedia, Media } from '@app/media/media';
import * as Global from '@shared/global/global';

@Component({
  selector: 'media-item',
  templateUrl: './item.component.html',
})
export class MediaItemComponent implements OnInit {
  @Input() public data!: Media | ImportMedia;
  @Input() public dynamic!: boolean; // Allow image update

  constructor() {
    //
  }

  public ngOnInit(): void {
    if (Global.isPopulated(this.data['id'])) { // For Media item
      const data = this.data as Media;
      data.url = `${SERVER_URL}/upload/${data.id}.jpg`;
      data.urlWebp = `${SERVER_URL}/upload/${data.id}.webp`;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { SERVER_URL } from '@shared/config/config';
import { ImportMedia, Media } from '@app/media/media';

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
    if ('id' in this.data) { // For Media item
      this.data.url = `${SERVER_URL}/upload/${this.data.id}.jpg`;
      this.data.urlWebp = `${SERVER_URL}/upload/${this.data.id}.webp`;
    }
  }
}

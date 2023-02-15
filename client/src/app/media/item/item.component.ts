import { Component, Directive, Input, OnInit } from '@angular/core';
import { SERVER_URL } from '@shared/config/config';

@Component({
  selector: 'media-item',
  templateUrl: './item.component.html',
})
export class MediaItemComponent implements OnInit {
  @Input() public data!: { [key: string]: any };
  @Input() public dynamic!: boolean; // Allow image update

  constructor() {
    //
  }

  public ngOnInit(): void {
    if (this.data.id) {
      this.data.url = `${SERVER_URL}/upload/${this.data.id}.jpg`;
      this.data.urlWebp = `${SERVER_URL}/upload/${this.data.id}.webp`;
    }
  }
}

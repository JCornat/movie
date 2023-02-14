import { Component, Directive, Input, OnInit } from '@angular/core';

@Component({
  selector: 'media-item',
  templateUrl: './item.component.html',
})
export class MediaItemComponent implements OnInit {
  @Input() public data: any;

  constructor() {
    //
  }

  public ngOnInit(): void {
    if (this.data.id) {
      this.data.url = `http://localhost:3000/upload/${this.data.id}.jpg`;
      this.data.urlWebp = `http://localhost:3000/upload/${this.data.id}.webp`;
    }
  }
}

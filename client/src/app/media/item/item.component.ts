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
    //
  }
}

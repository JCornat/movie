import { Input, OnInit } from '@angular/core';

export abstract class MediaItemComponent implements OnInit {
  @Input() public data: any;

  constructor() {
    //
  }

  public ngOnInit(): void {
    //
  }
}

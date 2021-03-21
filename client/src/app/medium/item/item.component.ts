import { Directive, Input, OnInit } from '@angular/core';

@Directive()
export abstract class MediumItemComponent implements OnInit {
  @Input() public data: any;

  constructor() {
    //
  }

  public ngOnInit(): void {
    //
  }
}

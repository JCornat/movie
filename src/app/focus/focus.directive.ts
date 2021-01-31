import { Directive, Input, ElementRef, Inject, OnInit } from '@angular/core';

@Directive({
  selector: '[c7zFocus]'
})
export class C7zFocusDirective implements OnInit {
  @Input() public c7zFocus: boolean;

  constructor(
    @Inject(ElementRef) public element: ElementRef,
  ) {
    //
  }

  public ngOnInit(): void {
    if (!this.c7zFocus) {
      return;
    }

    this.element.nativeElement.focus();
  }
}

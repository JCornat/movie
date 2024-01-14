import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[decorationInput]',
  standalone: true,
})
export class DecorationInputDirective {
  renderer = inject(Renderer2);
  hostElement = inject(ElementRef);

  constructor() {
    const classNames = [
      'w-full',
      'bg-transparent',
      'border',
      'border-white/30',
      'h-8',
      'pl-2.5',
      'rounded-lg',
      'text-sm',
    ];

    for (const className of classNames) {
      this.renderer.addClass(this.hostElement.nativeElement, className);
    }
  }
}

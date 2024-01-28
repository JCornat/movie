import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[decorationButton]',
  standalone: true,
})
export class DecorationButtonDirective {
  renderer = inject(Renderer2);
  hostElement = inject(ElementRef);

  constructor() {
    const classNames = [
      'w-full',
      'bg-transparent',
      'border',
      'border-white/30',
      'h-8',
      'px-2.5',
      'rounded-lg',
      'text-sm',
      'flex',
      'items-center',
    ];

    for (const className of classNames) {
      this.renderer.addClass(this.hostElement.nativeElement, className);
    }
  }
}

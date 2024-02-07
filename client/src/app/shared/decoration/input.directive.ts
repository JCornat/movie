import { Directive } from '@angular/core';

@Directive({
  selector: '[decorationInput]',
  standalone: true,
  host: {
    class: 'w-full bg-transparent border border-white/30 h-8 pl-2.5 rounded-lg text-sm',
  },
})
export class DecorationInputDirective {
}

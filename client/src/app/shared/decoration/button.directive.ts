import { Directive } from '@angular/core';

@Directive({
  selector: '[decorationButton]',
  standalone: true,
  host: {
    class: 'w-full bg-transparent border border-white/30 h-8 px-2.5 rounded-lg text-sm flex items-center',
  },
})
export class DecorationButtonDirective {
}

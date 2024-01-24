import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SharedIconService } from '@shared/icon/icon.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span [innerHTML]="svgIcon()" [style.fill]="fill()"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class SharedIconComponent {
  svgIconService = inject(SharedIconService);

  name = input.required<string>();
  fill = input<string>();
  svgIcon = computed(() => {
    return this.svgIconService.icons()[this.name()];
  });

  constructor() {
    toObservable(this.name)
      .subscribe((value) => {
        this.svgIconService.load(value);
      });
  }
}

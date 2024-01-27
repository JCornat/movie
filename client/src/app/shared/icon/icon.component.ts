import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SharedIconService } from '@shared/icon/icon.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <div class="flex items-center pointer-events-none h-full">
      <div class="fill-current" [innerHTML]="svgIcon()" [style.height]="height()"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class SharedIconComponent {
  svgIconService = inject(SharedIconService);

  name = input.required<string>();
  height = input<string>('20px');
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

import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup } from '@angular/forms';
import { OrderBy } from '@app/interface';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSortComponent {
  readonly orderBy = input.required<OrderBy>();

  readonly mediaForm = this.buildForm();
  readonly sorts = this.buildSortList();

  readonly onChange = output<OrderBy>();

  constructor() {
    this.subscribeInputChange();
    this.subscribeForm();
  }

  //region Method
  buildForm() {
    const formGroup = new FormGroup({
      orderBy: new FormControl<OrderBy>(OrderBy.random, { nonNullable: true }),
    });

    return signal(formGroup);
  }

  buildSortList() {
    const sortList: { value: OrderBy, label: string }[] = [
      { value: OrderBy.random, label: 'Random' },
      { value: OrderBy.alphabetic, label: 'A-Z' },
      { value: OrderBy.alphabeticReverse, label: 'Z-A' },
      { value: OrderBy.mostRecent, label: 'Most recent' },
      { value: OrderBy.leastRecent, label: 'Least recent' },
      { value: OrderBy.lastAdded, label: 'Last added' },
    ];

    return signal(sortList);
  }
  //endregion

  //region Subscribe
  subscribeInputChange() {
    toObservable(this.orderBy).subscribe((value) => {
      this.mediaForm().patchValue({ orderBy: value });
    });
  }

  subscribeForm(): void {
    this.mediaForm().valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.onChange.emit(data.orderBy!);
      });
  }
  //endregion
}

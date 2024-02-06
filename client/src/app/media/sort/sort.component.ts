import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
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
  orderBy = input.required<OrderBy>();

  @Output() onChange = new EventEmitter<OrderBy>();

  mediaForm = this.buildForm();
  sorts = this.buildSortList();

  constructor() {
    this.subscribeInputChange();
    this.subscribeForm();
  }

  /*-----------------------*\
            Method
  \*-----------------------*/

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

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeInputChange() {
    toObservable(this.orderBy).subscribe((value) => {
      this.mediaForm().patchValue({ orderBy: value });
    });
  }

  subscribeForm(): void {
    this.mediaForm().valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.onChange.emit(data.orderBy);
      });
  }
}

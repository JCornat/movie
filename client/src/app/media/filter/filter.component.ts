import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class MediaFilterComponent {
  searchTerm = input<string>('');

  @Output() onSearch = new EventEmitter<string>();

  searchForm = this.buildForm();

  showCloseIcon = signal(false);

  constructor() {
    this.subscribeInputChange();
    this.subscribeForm();
  }

  /*-----------------------*\
          Method
  \*-----------------------*/

  buildForm() {
    const formGroup = new FormGroup({
      search: new FormControl('', { nonNullable: true }),
    });

    return signal(formGroup);
  }

  onValid(data: { [key: string]: any }): void {
    this.onSearch.emit(data.search);
  }

  clearSearch() {
    this.searchForm().patchValue({ search: '' });
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeInputChange() {
    toObservable(this.searchTerm).subscribe((value) => {
      this.searchForm().patchValue({ search: value });
    });
  }

  subscribeForm(): void {
    this.searchForm().valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.onValid(data);
        this.showCloseIcon.set(!!data.search);
      });
  }
}

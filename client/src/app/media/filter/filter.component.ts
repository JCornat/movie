import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
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
  readonly searchTerm = input<string>('');

  readonly searchForm = this.buildForm();
  readonly showCloseIcon = signal(false);

  readonly onSearch = output<string>();

  constructor() {
    this.subscribeInputChange();
    this.subscribeForm();
  }

  //region Template
  clearSearch() {
    this.searchForm().patchValue({ search: '' });
  }
  //endregion

  //region Method
  buildForm() {
    const formGroup = new FormGroup({
      search: new FormControl('', { nonNullable: true }),
    });

    return signal(formGroup);
  }

  onValid(data: { [key: string]: any }): void {
    this.onSearch.emit(data.search);
  }
  //endregion

  //region Subscribe
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
  //endregion
}

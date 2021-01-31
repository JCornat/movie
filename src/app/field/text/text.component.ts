import { Component } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { SharedFieldComponent } from '../field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-text',
  templateUrl: './text.component.html'
})
export class FieldTextComponent extends SharedFieldComponent {
  public results: any[];
  public disableNextSearch: boolean;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    if (this.question.searchApi) {
      this.subscribeValueChanges();
    }
  }

  public selectOption(data: string, event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.disableNextSearch = true;
    this.results = null;
    this.control.setValue(data);
  }

  public subscribeValueChanges(): void {
    this.control.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.disableNextSearch) {
          this.disableNextSearch = false;
          return;
        }
      });
  }
}

import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-checkbox',
  templateUrl: './checkbox.component.html'
})
export class FieldCheckboxComponent extends SharedFieldComponent {
  // public fieldList: Array<{ key: string, value: string }>;

  public values: { [key: string]: boolean };

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    // if (this.question.apiUrl && this.question.apiUrl !== '') { // TODO CORRECT THIS
    //   this.formService.fieldListsObservable.subscribe((value) => {
    //     if (value[this.question.apiUrl]) {
    //       this.fieldList = value[this.question.apiUrl];
    //     }
    //   });
    //
    //   this.formService.pullFieldList(this.question.apiUrl);
    // }

    const initialValues = this.formatInitialValue();
    const values = {};
    for (const initialValue of initialValues) {
      values[initialValue] = true;
    }
    this.values = values;
    this.formatValue(initialValues);
  }

  public toggleOption(option: string, event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.question.readOnly) {
      return;
    }

    const value = this.values[option];
    if (value) {
      delete this.values[option];
    } else {
      this.values[option] = true;
    }

    this.formatValue(Object.keys(this.values));
  }

  public formatValue(result: string[]): void {
    let res;

    if (result.length === 0) {
      res = '';
    } else if (result.length === 1) {
      res = result[0];
    } else {
      res = result;
    }

    this.control.setValue(res);
  }

  public formatInitialValue(): string[] {
    if (Array.isArray(this.control.value)) {
      return this.control.value;
    } else if (this.control.value) {
      return [this.control.value];
    }

    return [];
  }
}

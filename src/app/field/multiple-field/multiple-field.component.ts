import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-multiple-field',
  templateUrl: './multiple-field.component.html'
})
export class FieldMultipleFieldComponent extends SharedFieldComponent {
  public form: FormGroup;

  constructor(
    public dynamicFormService: DynamicFormService,
    public formBuilder: FormBuilder,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    this.initForm();

    this.subscribeForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public add(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const group = this.generateNewGroup();
    const values = this.form.get('values') as FormArray;
    values.push(group);
  }

  public remove(index: number, event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const values = this.form.get('values') as FormArray;
    values.removeAt(index);
  }

  /*-----------------------*\
           Subscriber
  \*-----------------------*/

  public subscribeForm(): void {
    this.formatValue();

    this.form.valueChanges.subscribe(() => {
      this.formatValue();
    });
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public initForm(): void {
    const array = [];

    if (Array.isArray(this.control.value)) {
      for (const item of this.control.value) {
        const options = {
          key: item.key || undefined,
          value: item.value || item,
        };

        const group = this.generateNewGroup(options);
        array.push(group);
      }
    }

    this.form = this.formBuilder.group({
      values: this.formBuilder.array(array),
    });
  }

  public generateNewGroup(options: { key?: string, value?: string } = {}): FormGroup {
    if (options.key === undefined) {
      options.key = '';
    }

    if (options.value === undefined) {
      options.value = '';
    }

    return this.formBuilder.group({
      key: options.key,
      value: options.value,
    });
  }

  public formatValue(): void {
    const res = [];

    for (const item of this.form.value.values) {
      if (!item.value) {
        continue;
      }

      const tmp = {
        key: item.key || item.value,
        value: item.value,
      };

      res.push(tmp);
    }

    this.formGroup.get(this.question.key).setValue(res);
  }
}

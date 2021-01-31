import { Component, OnInit } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-range',
  templateUrl: './range.component.html'
})
export class FieldRangeComponent extends SharedFieldComponent implements OnInit {
  public values;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public ngOnInit(): void {
    const min = this.question.min;
    const max = this.question.max;
    const step = this.question.step || 1;

    const values = [];

    if (min < max && step > 0) {
      for (let i = min; i <= max; i += step) {
        values.push(i);

        if (values.length >= 11) {
          break;
        }
      }
    }

    this.values = values;
  }

  public select(option): void {
    if (this.question.readOnly) {
      return;
    }

    this.control.setValue(option);
  }
}

import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-number',
  templateUrl: './number.component.html',
  styles: [`
    input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }
  `],
})
export class FieldNumberComponent extends SharedFieldComponent {
  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }
}

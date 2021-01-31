import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-time',
  templateUrl: './time.component.html'
})
export class FieldTimeComponent extends SharedFieldComponent {
  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public now(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const value = `${hours}:${minutes}`;
    this.formGroup.get(this.question.key).setValue(value);
  }
}

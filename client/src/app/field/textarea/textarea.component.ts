import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-textarea',
  templateUrl: './textarea.component.html'
})
export class FieldTextareaComponent extends SharedFieldComponent {
  public rows: number;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    this.rows = this.question.rows || 5;
  }

  public appendText(text: string | number, event?: Event): void {
    if (event instanceof Event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const originalValue = this.control.value;
    this.control.setValue(`${originalValue}${text} `);
  }
}

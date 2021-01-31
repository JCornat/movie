import { Component } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-password',
  templateUrl: './password.component.html',
})
export class FieldPasswordComponent extends SharedFieldComponent {
  public typeField: string;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    this.typeField = 'password';
  }

  public changeTypeInputPassword() {
    if (this.typeField === 'password') {
      this.typeField = 'text';
    } else {
      this.typeField = 'password';
    }
  }
}

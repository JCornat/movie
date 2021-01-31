import { Component, OnInit } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-radio',
  templateUrl: './radio.component.html'
})
export class FieldRadioComponent extends SharedFieldComponent implements OnInit {
  // public fieldList: Array<{ key: string, value: string }>;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    super(dynamicFormService);
  }

  public ngOnInit(): void {
    // if (this.question.apiUrl && this.question.apiUrl !== '') { // TODO CORRECT THIS
    //   this.formService.fieldListsObservable.subscribe((value) => {
    //     if (value[this.question.apiUrl]) {
    //       this.fieldList = value[this.question.apiUrl];
    //     }
    //   });
    //
    //   this.formService.pullFieldList(this.question.apiUrl);
    // }
  }

  public select(option): void {
    if (this.question.readOnly) {
      return;
    }

    this.control.setValue(option.key || option.value);
  }
}

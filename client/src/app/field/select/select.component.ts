import { Component, OnInit } from '@angular/core';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-select',
  templateUrl: './select.component.html'
})
export class FieldSelectComponent extends SharedFieldComponent implements OnInit {
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

  public trackByFn(index: any, item: any) {
    return item.value;
  }
}

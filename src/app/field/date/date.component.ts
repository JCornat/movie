import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';
import { Question } from '../../question/question';
import * as Global from '../../global/global';

@Component({
  selector: 'field-date',
  templateUrl: './date.component.html'
})
export class FieldDateComponent extends SharedFieldComponent {
  public localGroup: FormGroup;

  public day: Question;
  public month: Question;
  public year: Question;

  private _focus: any;
  private focusSubject = new Subject<any>();
  public focusObservable = this.focusSubject.asObservable();

  constructor(
    public dynamicFormService: DynamicFormService,
    public formBuilder: FormBuilder,
  ) {
    super(dynamicFormService);
  }

  public init(): void {
    this.subscribeFocus();

    if (!this.question.skin) {
      this.initializeGroup();
    }
  }

  /*-----------------------*\
       Getter / Setter
  \*-----------------------*/

  public get focus() {
    return this._focus;
  }

  public set focus(data: any) {
    this._focus = data;
    this.focusSubject.next(this._focus);
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public initializeGroup(): void {
    const required = this.question.required; // Propagate required to local group
    const readOnly = this.question.readOnly; // Propagate required to local group
    const questions: Question[] = [
      {
        key: 'day',
        type: 'number',
        placeholder: 'Jour',
        required,
        validationRules: [
          {type: 'higherOrEqual', value: 1},
          {type: 'lowerOrEqual', value: 31},
        ],
        readOnly,
      }, {
        key: 'month',
        type: 'number',
        placeholder: 'Mois',
        required,
        validationRules: [
          {type: 'higherOrEqual', value: 1},
          {type: 'lowerOrEqual', value: 12},
        ],
        readOnly,
      }, {
        key: 'year',
        type: 'number',
        placeholder: 'Année',
        required,
        validationRules: [
          {type: 'higherOrEqual', value: 1900},
          {type: 'lowerOrEqual', value: 2100},
        ],
        readOnly,
      }
    ];

    this.day = questions[0];
    this.month = questions[1];
    this.year = questions[2];

    this.localGroup = this.dynamicFormService.buildFormGroupFromQuestions(questions);

    this.localGroup.valueChanges.subscribe(() => {
      this.onInternalChange();
    });

    if (this.control.value) {
      this.onExternalChange();
    }
  }

  public onExternalChange(): void {
    if (!this.question.skin) {
      const dateWithoutTime = this.control.value.split('T');
      const originalValue = dateWithoutTime[0].split('-');
      const day = +originalValue[2] || '';
      const month = +originalValue[1] || '';
      const year = +originalValue[0] || '';

      const value = {
        day,
        month,
        year,
      };

      this.dynamicFormService.setControlValues(this.localGroup, value);
    }
  }

  public onFocusIn(event?: any) {
    this.focus = true;
  }

  public onFocusOut(event?: any) {
    this.focus = false;
  }

  public onInternalChange(): void {
    const year = this.localGroup.get('year').value;
    const month = this.localGroup.get('month').value;
    const day = this.localGroup.get('day').value;

    const value = this.formatValue(year, month, day);
    this.setValue(value);
  }

  public formatValue(year: number, month: number, day: number): string {
    if (Global.isEmpty(day) && Global.isEmpty(month) && Global.isEmpty(year)) { // If all controls are empty, return empty string, for validation purpose
      return '';
    }

    if (Global.isNaN(year)) { // Initialize to 0 if empty control
      year = 0;
    }

    if (Global.isNaN(month)) { // Initialize to 0 if empty control
      month = 0;
    }

    if (Global.isNaN(day)) { // Initialize to 0 if empty control
      day = 0;
    }

    const formattedDay = ('' + day).padStart(2, '0');
    const formattedMonth = ('' + month).padStart(2, '0');
    const formattedYear = year;

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  public now(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.localGroup) {
      const date = new Date();
      const value = date.toISOString().split('T')[0];
      this.control.setValue(value);
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const value = {
        year,
        month,
        day,
      };

      this.dynamicFormService.setControlValues(this.localGroup, value);
    }
  }

  /*-----------------------*\
           Subscribe
  \*-----------------------*/

  public subscribeFocus(): void {
    this.focusObservable
      .pipe(debounceTime(100))
      .subscribe(() => {
        if (!this.focus) {
          this.control.markAsTouched(); // Warn parent group, date has been touched
          this.localGroup.markAllAsTouched(); // Useful for required date question, it will set all local controls to touched
        }
      });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from '../dynamic-form.service';
import { Question } from '../../question/question';
import * as Global from '../../global/global';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './group.component.html',
})
export class DynamicFormGroupComponent implements OnInit {
  @Input() set formGroup(data: FormGroup) {
    this.processFormGroup(data);
  }

  @Input() set questions(data: Question[]) {
    this.processQuestions(data);
  }

  @Output() public onSubmit = new EventEmitter<any>();

  public _formGroup: FormGroup;
  public _questions: Array<Question>;
  public lines: Question[][];

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    //
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onPressEnterKey(): void {
    this.submit();
  }

  public submit(): void {
    this.onSubmit.emit();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public validate(): void {
    this.checkErrors();
    this.dynamicFormService.markAsTouched(this._formGroup);
  }

  public checkErrors(): void {
    const errors = this.dynamicFormService.getErrors(this._formGroup) || {};
    for (const question of this._questions) {
      question.error = errors[question.key];
    }
  }

  public buildLines(questions: Question[]): void {
    const lines = [];
    for (const question of questions) {
      question.columnSize = question.columnSize || 'col-fill';
      const lastLine = lines[lines.length - 1];
      if (question.inline && lastLine) {
        lastLine.push(question);
      } else {
        lines.push([question]);
      }
    }

    this.lines = lines;
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public processFormGroup(group: FormGroup): void {
    if (Global.isEmpty(group)) {
      return;
    }

    this._formGroup = group;
  }

  public processQuestions(questions: Question[]): void {
    if (Global.isEmpty(questions)) {
      return;
    }

    this._questions = questions;
    this.buildLines(this._questions);
  }
}

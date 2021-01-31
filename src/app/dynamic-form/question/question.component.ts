import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { DynamicFormService } from '../dynamic-form.service';
import { Question } from '../../question/question';
import * as Global from '../../global/global';

@Component({
  selector: 'dynamic-form-question',
  templateUrl: './question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() set question(data: Question) {
    if (Global.isEmpty(data)) {
      return;
    }

    this._question = this.processQuestion(data);
    this.checkInitialized();
  }

  @Input() set formGroup(data: FormGroup) {
    this._formGroup = data;
    this.checkInitialized();
  }

  public _formGroup: FormGroup;
  public _question: Question;

  public error: string;

  constructor(
    public dynamicFormService: DynamicFormService,
    public sanitizer: DomSanitizer,
  ) {
    //
  }

  /*-----------------------*\
           Getter
  \*-----------------------*/

  public get control() {
    try {
      return this._formGroup.get(this._question.key);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public checkInitialized(): void {
    if (!this._formGroup || !this._question) {
      return;
    }

    if (this._question.disable) {
      this.control.disable();
    }
  }

  public processQuestion(question: Question): Question {
    if (!question.placeholder) {
      question.placeholder = '';
    }

    if (question.type === 'html' && question.content) {
      question.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(question.content);
    }

    return question;
  }
}

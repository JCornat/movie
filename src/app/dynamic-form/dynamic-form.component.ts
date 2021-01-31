import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { ActionRule } from '../question/action-rule';
import { DynamicForm } from './dynamic-form';
import { DynamicFormGroupComponent } from './group/group.component';
import { DynamicFormService } from './dynamic-form.service';
import { FormDictionary } from './form-dictionary';
import { FormDictionarySection } from './form-dictionary-section';
import { FormGroup } from '@angular/forms';
import { Question } from '../question/question';
import { Section } from '../section/section';
import * as Global from '../global/global';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  readonly componentName: string = 'DynamicFormComponent';

  @ViewChild('sectionForm') sectionForm;
  @ViewChild('sectionNavbar') sectionNavbar;
  @ViewChild('dynamicFormGroup') dynamicFormGroup: DynamicFormGroupComponent;

  @ViewChild('paymentContainer') paymentContainer;

  @Output() public formAnswer = new EventEmitter<any>();

  @Output() public onFirstPage = new EventEmitter<boolean>();
  @Output() public onLastPage = new EventEmitter<boolean>();
  @Output() public onFinished = new EventEmitter<boolean>();
  @Output() public onLoading = new EventEmitter<boolean>();
  @Output() public onError = new EventEmitter<string>();
  @Output() public onSubmit = new EventEmitter<{ id: number, values: { [key: string]: string | number } }>();

  @Input() set answers(data: { [key: string]: string | number }) {
    if (Global.isEmpty(data)) {
      return;
    }

    this._answers = data;

    if (this.formData) {
      const answer = this.formatAnswer(this._answers);
      this.globalFormGroup.patchValue(answer);
    }
  }

  @Input() set form(data: DynamicForm) {
    if (Global.isEmpty(data)) {
      return;
    }

    const clone = Global.clone(data);
    this.initializeForm(clone);
  }

  @Input() public submitButton = true;

  public loading: boolean;
  public error: string;

  public hasLocalErrors: boolean;
  public localFormGroup: FormGroup;
  public globalFormGroup: FormGroup;
  public formProgress: number;
  public formData: DynamicForm;
  public sections: Section[];
  public review: boolean;
  public formDictionary: FormDictionary;
  public enableReview: boolean;
  public visibleSectionsTotal: number;
  public currentSectionIndex: number;
  public questions: Question[];
  public values: { [key: string]: any };
  public _answers: { [key: string]: any };
  public section: Section;
  public paymentRequired: boolean;

  public sourceActionRules: { [key: string]: ActionRule[] };
  public targetActionRules: { [key: string]: ActionRule[] };
  public sourceOperations: { [key: string]: ActionRule[] };
  public targetOperations: { [key: string]: ActionRule[] };

  public currentIndex: number;
  private _isFirstPage: boolean;
  private _isLastPage: boolean;
  private _finished: boolean;
  private displaySubmitButton: boolean;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    //
  }

  /*-----------------------*\
        Getter / Setter
  \*-----------------------*/

  public get isFirstPage(): boolean {
    return this._isFirstPage;
  }

  public set isFirstPage(data: boolean) {
    this._isFirstPage = data;
    this.onFirstPage.emit(data);
  }

  public get isLastPage(): boolean {
    return this._isLastPage;
  }

  public set isLastPage(data: boolean) {
    this._isLastPage = data;
    this.onLastPage.emit(data);
  }

  public get finished(): boolean {
    return this._finished;
  }

  public set finished(data: boolean) {
    this._finished = data;
    this.onFinished.emit(data);
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public trackByFn(index: any, item: any): any {
    return index;
  }

  public clickSection(index: number, event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.changeSection(index);
  }

  public changeSection(index: number, options: { scroll: boolean } = {scroll: true}): void {
    for (const item of this.sections) { // Remove selected flag to sections
      delete item.selected;
    }

    if (index === -1) { // If index is -1, stop process & show review screen
      this.review = true;
      return;
    } else {
      this.review = false;
    }

    const section = this.sections[index];
    section.selected = true;
    this.updateFormProgress(this.sections);

    this.section = section;
    this.localFormGroup = this.globalFormGroup.get(this.section.key) as FormGroup;
    this.questions = this.section.questions;

    // Pages
    this.currentIndex = index;
    this.isFirstPage = this.dynamicFormService.isFirstSection(this.sections, index);
    this.isLastPage = this.dynamicFormService.isLastSection(this.sections, index);

    // Scroll
    if (options.scroll) {
      this.dynamicFormService.scroll();
    }

    this.scrollSectionNavbar();
    this.onGlobalFormGroupUpdate({difference: {}}); // Fire method to force error check on section change
  }

  public previousSection(): void {
    let index;

    if (this.review) {
      this.review = false;
      index = this.currentIndex;
    } else {
      const previousSection = this.dynamicFormService.getPreviousSection(this.sections, this.currentIndex);
      index = previousSection?.index;
    }

    this.changeSection(index);
  }

  public nextSection(): void {
    const nextSection = this.dynamicFormService.getNextSection(this.sections, this.currentIndex);
    const index = nextSection?.index;
    this.changeSection(index);
  }

  public redirect(): void {
    const destination = this.formData.destination;
    this.dynamicFormService.redirect(destination);
  }

  public async submitSection(): Promise<void> {
    if (!this.submitButton) {
      this.nextSection();
      return;
    }

    if (this.review) { // Execute review submit before sectionForm check, because sectionForm is not defined
      // await this.send();
      return;
    }

    this.dynamicFormGroup.validate(); // Force dynamic form group to be validated & marked as touch

    if (this.hasLocalErrors && !this.formData.requiredSkipable) {
      return;
    }

    if (this.isLastPage) {
      if (this.enableReview) {
        this.changeSection(-1); // Move to review page
        return;
      } else {
        // await this.send();
        return;
      }
    }

    this.nextSection();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public isPaymentRequired(): boolean {
    const questions = this.formDictionary;
    if (Global.isEmpty(questions)) {
      return false;
    }

    if (Global.isEmpty(this.formData.paymentId) || Global.isEmpty(this.formData.paymentQuestionKey)) {
      return false;
    }

    let res = false;
    for (const key of Object.keys(this.formDictionary)) {
      const dictionaryElement = this.formDictionary[key];
      if (dictionaryElement.type === 'section') {
        continue;
      }

      if (dictionaryElement.value.key === this.formData.paymentQuestionKey) {
        res = true;
        break;
      }
    }

    return res;
  }

  public onGlobalFormGroupUpdate(data: { difference: { [key: string]: string | number } }): any {
    this.values = this.dynamicFormService.flattenFormGroupValues(this.globalFormGroup);
    const formGroupPatchOptions = {
      formGroup: this.globalFormGroup,
      formDictionary: this.formDictionary,
      targetActionRules: this.targetActionRules,
      sourceActionRules: this.sourceActionRules,
      sourceOperations: this.sourceOperations,
      value: this.values,
      difference: data.difference,
    };

    this.dynamicFormService.processFormGroupPatch(formGroupPatchOptions);

    const globalErrors = this.dynamicFormService.getErrors(this.globalFormGroup);
    this.updateQuestionErrors(globalErrors);

    const localErrors = this.dynamicFormService.getErrors(this.localFormGroup);
    this.hasLocalErrors = Global.isPopulated(localErrors);

    this.updateSectionsProgress();
  }

  public scrollSectionNavbar(): void {
    if (!this.sectionNavbar) {
      return;
    }

    const navbarElement = this.sectionNavbar.nativeElement;
    if (navbarElement.scrollWidth <= navbarElement.clientWidth) { // Check if element is horizontally scrollable
      return;
    }

    const page = this.currentIndex;
    const sectionElement = document.getElementById(`section-${page}`);
    if (!sectionElement) {
      return;
    }

    const position = sectionElement.offsetLeft;
    navbarElement.scrollLeft = position - 16;
  }

  public async initializeForm(data: DynamicForm): Promise<void> {
    this.reset();

    if (Global.isEmpty(data.sections)) {
      return;
    }

    this.formData = data;
    this.enableReview = data.enableReview;
    this.sections = data.sections;
    this.formDictionary = this.dynamicFormService.buildFormDictionary({sections: this.sections});
    this.globalFormGroup = this.dynamicFormService.buildGroup(this.sections);
    this.displaySubmitButton = (data.type === 'form') || this.submitButton;
    this.paymentRequired = this.isPaymentRequired();
    this.dynamicFormService.assignIndexToSections(this.sections);
    this.subscribeGlobalFormGroupValueChanges();

    const firstSection = this.dynamicFormService.getFirstSection(this.sections);
    this.changeSection(firstSection.index, {scroll: false});

    const actionsRules = this.dynamicFormService.buildActionRules(this.sections);
    this.sourceActionRules = actionsRules.sourceActionRules;
    this.targetActionRules = actionsRules.targetActionRules;
    this.sourceOperations = actionsRules.sourceOperations;
    this.targetOperations = actionsRules.targetOperations;

    this.dynamicFormService.initialProcessFormGroupPatch(this.formDictionary, this.globalFormGroup, this.targetActionRules);
    this.updateFormProgress(this.sections);

    if (this._answers) {
      this.values = this._answers;
      const answer = this.formatAnswer(this._answers);
      this.globalFormGroup.patchValue(answer);
    } else {
      // this.values = await this.dynamicFormService.getAnswer(data.slug);
    }
  }

  public updateFormProgress(sections: Section[]): void {
    if (Global.isEmpty(sections)) {
      return;
    }

    this.visibleSectionsTotal = this.dynamicFormService.countVisibleSections(sections);
    this.currentSectionIndex = this.dynamicFormService.getCurrentSectionIndex(sections);
    this.formProgress = this.dynamicFormService.calculateFormProgress(sections);
  }

  /**
   * Format single-depth object values into a formGroup compatible, via the formDictionary
   * Example :
   * {
   *   question1: 'a',
   *   question2: 'b',
   * }
   *
   * Into :
   * {
   *   section1: {
   *     question1: 'a',
   *   },
   *   section2: {
   *     question2: 'b',
   *   },
   * }
   */
  public formatAnswer(values: { [key: string]: any }): { [key: string]: { [key: string]: any } } {
    const answer = {};
    for (const key of Object.keys(values)) {
      const dictionary = this.formDictionary[key];
      if (dictionary.type === 'section') {
        continue;
      }

      if (!answer[dictionary.sectionKey]) {
        answer[dictionary.sectionKey] = {};
      }

      answer[dictionary.sectionKey][key] = values[key];
    }

    return answer;
  }

  public reset(): void {
    this.finished = false;
    this.values = undefined;
    this.review = false;
  }

  /**
   * Keep track of errors via update in questions, to be able to get form progress
   */
  public updateQuestionErrors(errors: { [key: string]: string }): void {
    for (const key of Object.keys(this.formDictionary)) {
      const dictionaryElement = this.formDictionary[key];
      if (dictionaryElement.type === 'section') {
        continue;
      }

      dictionaryElement.value.error = errors?.[key];
    }
  }

  public updateSectionsProgress(): void {
    for (const key of Object.keys(this.formDictionary)) {
      const dictionaryElement = this.formDictionary[key];
      if (dictionaryElement.type === 'question') {
        continue;
      }

      this.updateSectionProgress(key);
    }
  }

  public updateSectionProgress(sectionKey: string): void {
    const sourceDictionarySection = this.dynamicFormService.getDictionaryElement({formDictionary: this.formDictionary, key: sectionKey, enableSections: true}) as FormDictionarySection;
    if (!sourceDictionarySection) {
      console.error('updateSectionProgress', 'sourceDictionarySection not found', sectionKey);
      return;
    }

    const section = sourceDictionarySection.value;
    section.progress = this.dynamicFormService.calculateSectionProgress(section.questions);
  }

  /*-----------------------*\
           Subscriber
  \*-----------------------*/

  public subscribeGlobalFormGroupValueChanges(): void{
    let previousDifference = {};
    this.globalFormGroup.valueChanges
      .pipe(debounceTime(50))
      .subscribe(() => {
        const diff = this.dynamicFormService.getDifference(previousDifference, this.globalFormGroup);
        if (!diff) {
          return;
        }

        previousDifference = {
          ...previousDifference,
          ...diff,
        };

        this.onGlobalFormGroupUpdate({difference: diff});
      });
  }
}

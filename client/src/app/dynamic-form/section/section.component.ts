import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ActionRule } from '../../question/action-rule';
import { DynamicFormGroupComponent } from '../group/group.component';
import { DynamicFormService } from '../dynamic-form.service';
import { FormDictionary } from '../form-dictionary';
import { Question } from '../../question/question';
import * as Global from '../../global/global';

@Component({
  selector: 'dynamic-form-section',
  templateUrl: './section.component.html',
})
export class DynamicFormSectionComponent implements OnInit {
  @ViewChild('dynamicFormGroup') dynamicFormGroup: DynamicFormGroupComponent;

  @Input() set questions(data: any[]) {
    this.processQuestions(data);
  }

  get questions(): any[] {
    return this._questions;
  }

  @Input() set values(data: any) {
    if (Global.isEmpty(data)) {
      return;
    }

    this.dynamicFormValues = data;
    this.processDynamicFormValues();
  }

  @Output() public onValid = new EventEmitter<any>();
  @Output() public onUpdate = new EventEmitter<any>();
  @Output() public onError = new EventEmitter<any>();
  @Output() public onSubmit = new EventEmitter<any>();

  public globalFormGroup: FormGroup;
  public _questions: Array<Question>;
  public _values: any;
  public dynamicFormValues: any;
  public lines: Question[][];
  public localFormGroup: FormGroup;
  public formDictionary: FormDictionary;

  public sourceActionRules: { [key: string]: ActionRule[] };
  public targetActionRules: { [key: string]: ActionRule[] };
  public sourceOperations: { [key: string]: ActionRule[] };
  public targetOperations: { [key: string]: ActionRule[] };

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.dynamicFormValues = {};
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public validate(): void {
    this.dynamicFormGroup.validate();
  }

  public submit(): void {
    this.onSubmit.emit();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public onGroupUpdate(data: { difference: { [key: string]: string | number } }): void {
    const formGroupValue = this.dynamicFormService.flattenFormGroupValues(this.globalFormGroup);
    const formGroupPatchOptions = {
      formGroup: this.globalFormGroup,
      formDictionary: this.formDictionary,
      targetActionRules: this.targetActionRules,
      sourceActionRules: this.sourceActionRules,
      sourceOperations: this.sourceOperations,
      value: formGroupValue,
      difference: data.difference,
    };

    this.dynamicFormService.processFormGroupPatch(formGroupPatchOptions);

    const errors = this.dynamicFormService.getErrors(this.globalFormGroup);
    if (Global.isPopulated(errors)) {
      this.onError.emit(errors);
    } else {
      this.onValid.emit(formGroupValue);
    }

    this.onUpdate.emit(formGroupValue);
  }

  public setControlValues(): void {
    if (Global.isEmpty(this.localFormGroup)) {
      return;
    }

    this.dynamicFormService.setControlValues(this.localFormGroup, this._values);
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public processQuestions(questions: Question[]): void {
    if (Global.isEmpty(questions)) {
      return;
    }

    this._questions = questions;

    const sections = [
      {key: 'automaticSection', questions: this._questions},
    ];

    this.formDictionary = this.dynamicFormService.buildFormDictionary({sections});
    this.globalFormGroup = this.dynamicFormService.buildGroup(sections);
    this.localFormGroup = this.globalFormGroup.get('automaticSection') as FormGroup;

    const actionsRules = this.dynamicFormService.buildActionRules(sections);
    this.sourceActionRules = actionsRules.sourceActionRules;
    this.targetActionRules = actionsRules.targetActionRules;
    this.sourceOperations = actionsRules.sourceOperations;
    this.targetOperations = actionsRules.targetOperations;

    this.dynamicFormService.initialProcessFormGroupPatch(this.formDictionary, this.globalFormGroup, this.targetActionRules);
    this.subscribeBuiltGroupValueChanges();

    this.processDynamicFormValues();
  }

  public processDynamicFormValues(): void {
    if (Global.isEmpty(this.localFormGroup) || Global.isEmpty(this.dynamicFormValues)) {
      return;
    }

    const keys = Global.extract(this._questions, 'key');
    let hasDifference;
    for (const key of keys) {
      const value = this.dynamicFormValues[key];
      if (value === undefined) {
        continue;
      }

      if (Global.isEmpty(this.localFormGroup.get(key))) {
        continue;
      }

      if (this.localFormGroup.get(key).value !== value) {
        hasDifference = true;
      }
    }

    const a = '';
    const b = a

    if (!hasDifference) {
      return;
    }

    this._values = this.dynamicFormValues;
    this.setControlValues();
  }

  /*-----------------------*\
           Subscriber
  \*-----------------------*/

  public subscribeBuiltGroupValueChanges(): void {
    let previousDifference = {};
    this.globalFormGroup.valueChanges
      .pipe(debounceTime(50))
      .subscribe(() => {
        const difference = this.dynamicFormService.getDifference(previousDifference, this.globalFormGroup);
        if (!difference) {
          return;
        }

        previousDifference = {
          ...previousDifference,
          ...difference,
        };

        this.onGroupUpdate({difference});
      });
  }
}

import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Section } from '../section/section';
import * as Global from '../global/global';
import { ValidatorService } from '../validator/validator.service';
import { Question } from '../question/question';
import { ActionRule } from '../question/action-rule';
import { DynamicForm } from './dynamic-form';
import { FormDictionary } from './form-dictionary';
import { FormDictionarySection } from './form-dictionary-section';
import { FormDictionaryQuestion } from './form-dictionary-question';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor(
    public formBuilder: FormBuilder,
    public validatorService: ValidatorService,
  ) {
    //
  }

  public buildSections(sections: Section[]): FormGroup[] {
    const builtSections = [];

    for (const section of sections) {
      const questions = section.questions;
      builtSections.push(this.buildFormGroupFromQuestions(questions));
    }

    return builtSections;
  }

  public buildGroup(sections: Section[]): FormGroup {
    const group = {};

    for (const section of sections) {
      const questions = section.questions;
      const sectionGroup = this.buildFormGroupFromQuestions(questions);
      group[section.key] = sectionGroup;
    }

    return this.formBuilder.group(group);
  }

  // Build form's section
  public buildFormGroupFromQuestions(questions: Question[]): FormGroup {
    const res = {};

    for (const question of questions) {
      const validators = [];

      if (!question.validationRules) {
        question.validationRules = [];
      }

      if (question.required) {
        validators.push(Validators.required, this.validatorService.getRule({type: 'notOnlyWhitespaces'}, question));
      }

      switch (question.type) {
        case 'date':
          question.validationRules.push({type: 'date'});
          break;
        default:
          break;
      }

      for (const validationRule of question.validationRules) {
        const rule = this.validatorService.getRule(validationRule, question, {allowEmptyValue: true});
        if (!rule) {
          continue;
        }

        validators.push(rule);
      }

      res[question.key] = new FormControl('', validators);
    }

    return this.formBuilder.group(res);
  }

  public redirect(destination): void {
    window.location.href = destination;
  }

  /**
   * Return object with each control's errors.
   * If control doesn't have errors, key is set as undefined
   *
   * Example :
   * If question1 and question3 have errors, and question 2 hasn't :
   *
   * {
   *   question1: 'Ce champ est requis.',
   *   question2: undefined,
   *   question3: 'Le champ doit contenir au moins une lettre. Le champ doit contenir au moins un chiffre',
   * }
   */
  public getErrors(control: AbstractControl, controlName?: string): { [key: string]: string } {
    let res = {};

    if (control instanceof FormControl) {
      if (Global.isEmpty(control.errors)) {
        return;
      }

      const errors = [];
      const errorKeys = Object.keys(control.errors);

      for (const errorKey of errorKeys) { // Pour chaque erreur
        const error = control.errors[errorKey];

        if (errorKey === 'required') {
          const requiredTemplate = this.validatorService.getErrorPattern(errorKey);
          errors.push(requiredTemplate);
          continue;
        }

        const compiledErrorPattern = this.buildErrorTemplate(error.pattern, error.value);
        errors.push(compiledErrorPattern);
      }

      return {[controlName]: `${errors.join('. ')}.`};
    }

    const controls = (control as FormGroup).controls;
    for (const key of Object.keys(controls)) {
      const errorObj = this.getErrors(control.get(key), key);
      if (!errorObj) {
        continue;
      }

      res = {
        ...res,
        ...errorObj,
      };
    }

    if (Global.isEmpty(res)) {
      return;
    }

    return res;
  }

  public isFirstSection(sections: Section[], index: number): boolean {
    const firstPage = this.getFirstSection(sections);
    return index === firstPage?.index;
  }

  public isLastSection(sections: Section[], index: number): boolean {
    const sectionTotal = this.getLastSection(sections);
    return index === sectionTotal?.index;
  }

  public getFirstSection(sections: Section[]): Section {
    let res;
    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      res = section;
      break;
    }

    return res;
  }

  public getLastSection(sections: Section[]): Section {
    let res;
    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      res = section;
    }

    return res;
  }

  public getNextSection(sections: Section[], index: number): Section {
    let res;
    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      res = section;

      if (section.index > index) { // If section's index is greater than current index, return the section
        break;
      }
    }

    return res;
  }

  public getPreviousSection(sections: Section[], index: number): Section {
    let res;
    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      if (section.index >= index) { // If section's index is greater or equal to current index, return the previous section
        break;
      }

      res = section;
    }

    return res;
  }

  public buildErrorTemplate(template: string, value: string): string {
    if (!template) {
      return '';
    }

    let res = template.replace(/{valeur}/g, value);

    const s = (+value > 1) ? 's' : '';
    res = res.replace(/{s}/g, s);

    return res;
  }

  public scroll(): void {
    const elements = document.getElementsByClassName('grid');
    if (elements.length === 0) {
      return;
    }

    elements[0].scrollTop = 0;
  }

  public markAsTouched(formGroup: FormGroup): void {
    const keys = Object.keys(formGroup.controls);

    for (const key of keys) {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    }
  }

  public calculateSectionProgress(questions: Question[]): number {
    let total = 0;
    let valid = 0;

    for (const question of questions) {
      if (question.hide || question.disable) { // If question is hidden, exclude it from progression
        continue;
      }

      if (question.error === undefined) {
        valid++;
      }

      total++;
    }

    if (total === 0) { // Avoid divide by 0
      return 100;
    }

    return (valid / total) * 100;
  }

  public validateActionRules(options: { values: { [key: string]: any }, actionRules: ActionRule[], question: Question, sections?: any[], questions?: any[] }): ActionRule[] {
    let displayRule: ActionRule = null;
    const operationRules: ActionRule[] = [];

    if (options.question.defaultDisable || options.question.defaultDisable + '' === 'true') {
      displayRule = {action: 'disable', target: options.question.key, type: '', value: ''};
    }

    let previousActionResultBoolean = null;
    let previousConnector = null;

    for (const actionRule of options.actionRules) {
      const rule = this.validatorService.getRule(actionRule, options.question);
      if (!rule) {
        previousActionResultBoolean = null;
        previousConnector = null;
        continue;
      }

      const value = (Global.isPopulated(options.values)) ? options.values[actionRule.source] : '';
      const error = rule({value} as FormControl);

      // Process rules & connectors
      const actionResultBoolean = !error;
      if (previousActionResultBoolean === null) { // Initialize previousActionResultBoolean
        previousActionResultBoolean = actionResultBoolean;
      } else {
        switch (previousConnector) {
          case 'and':
            previousActionResultBoolean = previousActionResultBoolean && actionResultBoolean;
            break;
          case 'or':
            previousActionResultBoolean = previousActionResultBoolean || actionResultBoolean;
            break;
          default:
            console.error('connector not supported', actionRule.connector);
            break;
        }
      }

      if (actionRule.connector) {
        previousConnector = actionRule.connector;
        continue;
      }

      const valid = previousActionResultBoolean;
      previousActionResultBoolean = null;
      previousConnector = null;

      if (valid) {
        switch (actionRule.action) {
          case 'enable':
          case 'show':
          case 'disable':
          case 'hide':
            displayRule = actionRule;
            break;
          case 'setValue':
            actionRule.disabled = false;
            operationRules.push(actionRule);
            break;
          default:
            console.error('ActionRule action not supported', actionRule.action);
            break;
        }
      } else {
        switch (actionRule.action) {
          case 'setValue':
            actionRule.disabled = true;
            const resetRule: ActionRule = {action: 'unsetValue', target: options.question.key, type: '', value: ''};
            operationRules.push(resetRule);
            break;
          default:
            break;
        }
      }
    }

    const res: ActionRule[] = [...operationRules];
    if (displayRule) {
      res.push(displayRule);
    }

    return res;
  }

  public getElement(options: { form: DynamicForm, key: string, enableSections?: boolean, enableQuestions?: boolean }): any | null {
    let res = null;

    if (Global.isEmpty(options.form) || Global.isEmpty(options.form.sections) || Global.isEmpty(options.key)) {
      return res;
    }

    for (const section of options.form.sections) {
      if (res) {
        break;
      }

      if (Global.isPopulated(options.enableSections) && (section.key === options.key)) {
        res = section;
        break;
      }

      if (Global.isEmpty(section.questions) || Global.isEmpty(options.enableQuestions)) {
        continue;
      }

      for (const question of section.questions) {
        if (question.key === options.key) {
          res = question;
          break;
        }
      }
    }

    return res;
  }

  public getDictionaryElement(options: { formDictionary: FormDictionary, key: string, enableSections?: boolean, enableQuestions?: boolean }): FormDictionarySection | FormDictionaryQuestion {
    if (Global.isEmpty(options.formDictionary) || Global.isEmpty(options.key)) {
      return null;
    }

    const element = options.formDictionary[options.key];

    if (!element) {
      return null;
    }

    if (!options.enableQuestions && element.type === 'question') {
      return null;
    }

    if (!options.enableSections && element.type === 'section') {
      return null;
    }

    return element;
  }

  public setControlValues(group: FormGroup, data: any): void {
    if (Global.isEmpty(data)) {
      return;
    }

    const values = {};

    for (const key of Object.keys(data)) {
      const control = group.get(key);
      if (!control) {
        continue;
      }

      const value = data[key];
      if (control.value === value) { // Avoid useless setValue
        continue;
      }

      values[key] = value;
    }

    group.patchValue(values);
  }

  public disableElement(options: { formGroup?: FormGroup, target: Section | Question }): void {
    if (Global.isEmpty(options?.target) || Global.isEmpty(options.formGroup)) {
      console.error('DynamicFormService.enableElement', 'Missing parameter');
      return;
    }

    if (options.target.disable) { // If element is already disabled, then skip
      return;
    }

    options.target.disable = true;

    // tslint:disable-next-line:no-string-literal
    if (!options.target['type']) { // If target is a section, stop here
      return;
    }

    if (!options.formGroup.get(options.target.key)) { // Check the question is in group
      return;
    }

    options.formGroup.get(options.target.key).disable({emitEvent: false});
  }

  public enableElement(options: { formGroup?: FormGroup, target: Section | Question }): void {
    if (Global.isEmpty(options?.target) || Global.isEmpty(options.formGroup)) {
      console.error('DynamicFormService.enableElement', 'Missing parameter');
      return;
    }

    if (!options.target.disable) { // If element is not disabled, then skip
      return;
    }

    delete options.target.disable;

    // tslint:disable-next-line:no-string-literal
    if (!options.target['type']) { // If target is a section, stop here
      return;
    }

    if (!options.formGroup.get(options.target.key)) { // Check the question is in group
      return;
    }

    options.formGroup.get(options.target.key).enable({emitEvent: false}); // Do not emit event to avoid formGroup update
  }

  public countVisibleSections(sections: Section[], options: { countAll?: boolean } = {}): number {
    let res = 0;
    for (const section of sections) {
      if (!options.countAll && (section.hide || section.disable)) {
        continue;
      }

      res++;
    }

    return res;
  }

  public assignIndexToSections(sections: Section[]): void {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      section.index = i;
    }
  }

  public calculateFormProgress(sections: Section[]): number {
    let progress = 0;
    let total = 0;

    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      total++;

      if (Global.isNaN(section.progress)) {
        continue;
      }

      progress += section.progress;
    }

    const res = progress / total;
    return +res.toFixed(0);
  }

  public getCurrentSectionIndex(sections: Section[]): number {
    let res = 0;
    for (const section of sections) {
      if (section.hide || section.disable) {
        continue;
      }

      res++;

      if (section.selected) {
        break;
      }
    }

    return res;
  }

  /**
   * Keep track of each form element via an object
   */
  public buildFormDictionary(options: { sections: Section[] }): FormDictionary {
    const formDictionary: FormDictionary = {};

    for (const section of options.sections) {
      if (section.key) {
        formDictionary[section.key] = {type: 'section', value: section};
      }

      if (Global.isEmpty(section.questions)) {
        continue;
      }

      for (const question of section.questions) {
        if (!question.key) {
          console.error('buildFormDictionary', 'Question without key', question);
          continue;
        }

        if (formDictionary[question.key]) {
          console.error('buildFormDictionary', 'Key already exists', question);
          continue;
        }

        formDictionary[question.key] = {type: 'question', sectionKey: section.key, value: question};
      }
    }

    return formDictionary;
  }

  /**
   * Transform group values into an single-depth object
   * Example :
   * {
   *   section1: {
   *     question1: 'a',
   *     question2: 'b',
   *   }
   * }
   *
   * Into :
   * {
   *   question1: 'a',
   *   question2: 'b',
   * }
   */
  public flattenFormGroupValues(formGroup: FormGroup): { [key: string]: any } {
    const rawValues = formGroup.getRawValue();

    let res: { [key: string]: any } = {};
    for (const key of Object.keys(rawValues)) {
      res = {
        ...res,
        ...rawValues[key],
      };
    }

    return res;
  }

  /**
   * Recursive method to get FormGroup or FormControl difference between oldValue and newValue
   */
  public getDifference(oldValue: { [key: string]: string | number }, control: AbstractControl, controlName?: string): { [key: string]: string | number } {
    let res = {};

    if (control instanceof FormControl) {
      if (JSON.stringify(control.value) === JSON.stringify(oldValue[controlName])) { // Stringify for array / object values
        return;
      }

      return {
        [controlName]: control.value,
      };
    }

    const controls = (control as FormGroup).controls;
    for (const key of Object.keys(controls)) {
      const difference = this.getDifference(oldValue, control.get(key), key);
      if (!difference) {
        continue;
      }

      res = {
        ...res,
        ...difference,
      };
    }

    if (Global.isEmpty(res)) {
      return;
    }

    return res;
  }

  public executeOperation(data: { operation: string, formData: { [key: string]: any } }): string | number {
    const matches = data.operation.match(/\{(.*?)\}/g);
    if (!matches) {
      // tslint:disable-next-line:no-eval
      return eval(data.operation);
    }

    let res = data.operation;

    for (const match of matches) {
      const questionKey = /\{(.*?)\}/.exec(match)?.[1]; // Do not store this regex into a variable
      if (!questionKey) {
        console.error('processOperation', 'YOU SHOULD NOT BE HERE', match, questionKey);
        continue;
      }

      const questionValue = data.formData[questionKey] || 0;
      res = res.replace(match, questionValue);
    }

    // tslint:disable-next-line:no-eval
    return eval(res);
  }

  /**
   * Process actions rules into 4 variables :
   * - sourceActionRules : Keep track of the source in all action rules
   * - targetActionRules : Keep track of the targets in all action rules
   * - sourceOperations : Keep track of the source in action rules that are operations (type = setValue)
   * - targetOperations : Keep track of the targets in action rules that are operations (type = setValue)
   */
  public buildActionRules(data: Section[]): { sourceActionRules: { [key: string]: ActionRule[] }; targetActionRules: { [key: string]: ActionRule[] }; sourceOperations: { [key: string]: ActionRule[] }; targetOperations: { [key: string]: ActionRule[] } } {
    const sourceActionRules: { [key: string]: ActionRule[] } = {};
    const targetActionRules: { [key: string]: ActionRule[] } = {};
    const operations: ActionRule[] = [];

    const sections: Section[] = Global.clone(data);
    for (const section of sections) {
      if (Global.isEmpty(section.questions)) {
        continue;
      }

      for (const question of section.questions) {
        if (Global.isEmpty(question.actionRules)) {
          continue;
        }

        let connectorActionRules = [];
        for (const actionRule of question.actionRules) {
          if (!actionRule.source) { // If no source, then current question is source
            actionRule.source = question.key;
          }

          if (actionRule.action === 'setValue') {
            operations.push(actionRule);
          }

          if (!sourceActionRules[actionRule.source]) {
            sourceActionRules[actionRule.source] = [];
          }

          sourceActionRules[actionRule.source].push(actionRule);

          if (actionRule.connector) { // If action rule has a connector, then store it and continue until action rule as target
            connectorActionRules.push(actionRule);
            continue;
          }

          for (const connectorActionRule of connectorActionRules) {
            connectorActionRule.target = actionRule.target; // Inherit current action rule target
          }

          if (!targetActionRules[actionRule.target]) {
            targetActionRules[actionRule.target] = [];
          }

          targetActionRules[actionRule.target].push(...connectorActionRules, actionRule);

          connectorActionRules = []; // Reset for next action rules
        }
      }
    }

    const processedOperations = this.processOperations(operations);

    return {
      sourceActionRules,
      targetActionRules,
      targetOperations: processedOperations.targetOperations,
      sourceOperations: processedOperations.sourceOperations,
    };
  }

  public processOperations(actionRules: ActionRule[]): { targetOperations: { [key: string]: ActionRule[] }, sourceOperations: { [key: string]: ActionRule[] } } {
    const targetOperations: { [key: string]: ActionRule[] } = {};
    const sourceOperations: { [key: string]: ActionRule[] } = {};

    for (const actionRule of actionRules) {
      const operation = actionRule.operation;
      const matches = operation.match(/\{(.*?)\}/g);

      if (matches) {
        const linkedQuestions = [];
        for (const match of matches) {
          const questionKey = /\{(.*?)\}/.exec(match)?.[1]; // Do not store this regex into a variable
          if (!questionKey) {
            console.error('processOperation', 'YOU SHOULD NOT BE HERE', match, questionKey);
            continue;
          }

          linkedQuestions.push(questionKey);

          if (Global.isEmpty(sourceOperations[questionKey])) {
            sourceOperations[questionKey] = [];
          }

          sourceOperations[questionKey].push(actionRule);
        }

        actionRule.linkedQuestions = linkedQuestions;
      }

      if (Global.isEmpty(targetOperations[actionRule.target])) {
        targetOperations[actionRule.target] = [];
      }

      targetOperations[actionRule.target].push(actionRule);
    }

    return {
      targetOperations,
      sourceOperations,
    };
  }

  /**
   * Build stateObj & patchValue variables with updates needed after each form update
   * stateObj stores the enable / disable element state
   * patchValue stores the patch values which will be applied at the end of this method
   */
  public processFormGroupPatch(options: { formGroup: FormGroup, formDictionary: FormDictionary, targetActionRules: { [key: string]: ActionRule[] }, sourceActionRules: { [key: string]: ActionRule[] }, sourceOperations: { [key: string]: ActionRule[] }, value: { [key: string]: string | number }, difference: { [key: string]: string | number } }): void {
    if (Global.isEmpty(options?.difference)) {
      return;
    }

    const patchValue: { [key: string]: any } = {};
    const stateObj: { [key: string]: boolean } = {};

    for (const key of Object.keys(options.difference)) {
      const sourceDictionaryQuestion = this.getDictionaryElement({formDictionary: options.formDictionary, key, enableQuestions: true}) as FormDictionaryQuestion;
      if (!sourceDictionaryQuestion) {
        console.error('checkStates', 'sourceDictionaryQuestion not found', key);
        continue;
      }

      const actionRules = options.sourceActionRules[key];
      if (actionRules) {
        const targetKeys = Global.extract(actionRules, 'target');
        for (const targetKey of targetKeys) {
          this.buildPatchValueAndStateObj(stateObj, patchValue, targetKey, options.value, options.formDictionary, options.targetActionRules);
        }

        this.updateState(stateObj, options.formDictionary, options.formGroup); // Enable / disable elements
      }

      const operationsRules = options.sourceOperations[key];
      if (operationsRules) {
        for (const operationsRule of operationsRules) {
          const sectionKey = (options.formDictionary[operationsRule.target] as FormDictionaryQuestion).sectionKey;
          if (Global.isEmpty(patchValue[sectionKey])) {
            patchValue[sectionKey] = {};
          }

          if (operationsRule.disabled) {
            patchValue[sectionKey][operationsRule.target] = 0;
            continue;
          }

          const value = this.executeOperation({operation: operationsRule.operation, formData: options.value});
          patchValue[sectionKey][operationsRule.target] = value;
        }
      }
    }

    if (Global.isPopulated(patchValue)) {
      options.formGroup.patchValue(patchValue); // Apply calculated values
    }
  }

  /**
   * Method launched only the first time, to get initial status (enable/disable) of questions & sections and patches needed
   */
  public initialProcessFormGroupPatch(formDictionary: FormDictionary, formGroup: FormGroup, targetActionRules: { [key: string]: ActionRule[] }): void {
    const patchValue: { [key: string]: any } = {};
    const stateObj: { [key: string]: boolean } = {};

    for (const key of Object.keys(formDictionary)) {
      const dictionaryElement = formDictionary[key];
      if (!dictionaryElement.value.defaultDisable) {
        continue;
      }

      stateObj[dictionaryElement.value.key] = false;
    }

    for (const key of Object.keys(targetActionRules)) {
      this.buildPatchValueAndStateObj(stateObj, patchValue, key, {}, formDictionary, targetActionRules);
    }

    this.updateState(stateObj, formDictionary, formGroup);

    if (Global.isPopulated(patchValue)) {
      formGroup.patchValue(patchValue);
    }
  }

  /**
   * Update stateObj & patchValue variables with updates needed after each form update
   * stateObj stores the enable / disable element state
   * patchValue stores the patch values which will be applied
   */
  public buildPatchValueAndStateObj(stateObj: { [key: string]: boolean }, patchValue: { [key: string]: { [key: string]: string | number } }, key: string, values: { [key: string]: any }, formDictionary: FormDictionary, targetActionRules: { [key: string]: ActionRule[] }): void {
    const actionRules = targetActionRules[key];
    if (Global.isEmpty(actionRules)) {
      console.error('checkInitialStates', 'no targetActionRules', key);
      return;
    }

    const formDictionaryQuestion = this.getDictionaryElement({formDictionary, key, enableQuestions: true}) as FormDictionaryQuestion;
    if (!formDictionaryQuestion) {
      console.error('checkInitialStates', 'Question not found', key);
      return;
    }

    const sectionKey = formDictionaryQuestion.sectionKey;
    const validatedActionRules = this.validateActionRules({values, question: formDictionaryQuestion.value, actionRules});
    if (Global.isEmpty(validatedActionRules)) {
      return;
    }

    for (const validatedActionRule of validatedActionRules) {
      switch (validatedActionRule.action) {
        case 'enable':
        case 'show':
          stateObj[key] = true;
          break;
        case 'disable':
        case 'hide':
          stateObj[key] = false;
          break;
        case 'setValue':
          if (Global.isEmpty(patchValue[sectionKey])) {
            patchValue[sectionKey] = {};
          }

          const value = this.executeOperation({operation: validatedActionRule.operation, formData: {}});
          patchValue[sectionKey][validatedActionRule.target] = value;
          break;
        case 'unsetValue':
          if (Global.isEmpty(patchValue[sectionKey])) {
            patchValue[sectionKey] = {};
          }

          if (Global.isPopulated(patchValue[sectionKey][validatedActionRule.target])) {
            break;
          }

          patchValue[sectionKey][validatedActionRule.target] = 0;
          break;
        default:
          break;
      }
    }
  }

  /**
   * Enable or disable elements via the stateObj in parameter
   */
  public updateState(stateObj: { [key: string]: boolean }, formDictionary: FormDictionary, builtGroup: FormGroup): void {
    for (const elementKey of Object.keys(stateObj)) {
      const dictionaryElement = this.getDictionaryElement({formDictionary, key: elementKey, enableQuestions: true, enableSections: true});
      if (!dictionaryElement) {
        console.error('checkInitialStates', 'Element not found', elementKey);
        continue;
      }

      let formGroup: FormGroup;
      if (dictionaryElement.type === 'section') {
        formGroup = builtGroup;
      } else {
        formGroup = builtGroup.get(dictionaryElement.sectionKey) as FormGroup;
      }

      const status = stateObj[elementKey];
      if (status) {
        this.enableElement({formGroup, target: dictionaryElement.value});
      } else {
        this.disableElement({formGroup, target: dictionaryElement.value});
      }
    }
  }
}

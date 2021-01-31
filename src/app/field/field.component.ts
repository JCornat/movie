import { EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import * as Global from '../global/global';
import { Question } from '../question/question';
import { DynamicFormService } from '../dynamic-form/dynamic-form.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class SharedFieldComponent implements OnInit {
  @Input() public question: Question;
  @Input() public formGroup: FormGroup;

  @Output() public onFocus = new EventEmitter<string>();
  @Output() public onKeyPress = new EventEmitter<string>();
  @Output() public onValueChange = new EventEmitter<string>();

  public currentValue: any;

  constructor(
    public dynamicFormService: DynamicFormService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.subscribeExternalChange();

    this.init();
  }

  public init(): void {
    //
  }

  public get control(): AbstractControl {
    if (Global.isEmpty(this.question.key)) {
      console.error('QUESTION KEY NOT DEFINED', this.question);
      throw new Error('QUESTION KEY NOT DEFINED');
    }

    return this.formGroup.get(this.question.key);
  }

  public valueChanged(): void {
    this.onValueChange.emit();
  }

  public keyPressed(): void {
    this.onKeyPress.emit();
  }

  public focused(): void {
    this.onFocus.emit();
  }

  public subscribeExternalChange(): void {
    this.currentValue = this.control?.value;

    this.control?.valueChanges.subscribe((data) => {
      if (JSON.stringify(this.currentValue) === JSON.stringify(data)) {
        return;
      }

      this.currentValue = data;
      this.setValue(this.currentValue);
      this.onExternalChange();
    });
  }

  public onExternalChange(): void {
    //
  }

  public setValue(value: any): void {
    this.currentValue = value;
    this.control?.setValue(value);
  }
}

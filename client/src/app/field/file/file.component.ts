import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Global from '../../global/global';
import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';
import { ValidatorService } from '../../validator/validator.service';

@Component({
  selector: 'field-file',
  templateUrl: './file.component.html'
})
export class FieldFileComponent extends SharedFieldComponent implements OnInit {
  @ViewChild('inputFile', {static: false}) public inputFile: ElementRef;

  public uploadError: boolean;
  public accept: string;
  public progress: number;
  public isDragover: boolean;
  public isSending: boolean;
  public sent: boolean;
  public currentFile: File;
  public xhr: XMLHttpRequest;
  public imgURL: string;
  public message: string;


  constructor(
    public dynamicFormService: DynamicFormService,
    public validatorService: ValidatorService,
  ) {
    super(dynamicFormService);
  }

  public ngOnInit(): void {
    this.subscribeExternalChange();

    this.progress = 0;
    if (this.question['fileType'] === 'extension') {
      this.accept = this.question['fileExt'];
    } else {
      this.accept = this.question['fileType'];
    }
  }

  public retryUploadFile(): void {
    this.uploadFile(this.currentFile);
  }

  public onFileDropped(file: File): void {
    this.isDragover = false;
    this.uploadFile(file);
  }

  public uploadFile(file: File): void {
    this.uploadError = false;
    this.question.error = null;

    const isValid = this.validate(file);
    if (!isValid) {
      return;
    }

    this.currentFile = file;

    this.makeFileRequest(this.question.content, file);
  }

  public dragOver(event: boolean): void {
    this.isDragover = event;
  }

  public selectFile(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('selectFile');
    this.inputFile.nativeElement.click();
  }

  public validate(file: File): boolean {
    if (Global.isEmpty(this.question.validationRules)) {
      return true;
    }

    for (const rule of this.question.validationRules) {
      switch (rule.type) {
        case 'size':
          const allowedSize = rule.value;
          const fileSize = (file.size / 1024 / 1024);

          if (allowedSize < fileSize) {
            const errorPattern = this.validatorService.getErrorPattern(rule.type);
            this.control.markAsTouched();
            this.question.error = this.dynamicFormService.buildErrorTemplate(errorPattern, allowedSize + '');
            return false;
          }

          break;
        default:
          console.log('validation rule not supported', rule.type);
          break;
      }
    }

    return true;
  }

  public selectedFile(event: any): void {
    const files = event.target.files;
    if (Global.isEmpty(files)) {
      return;
    }

    this.uploadFile(files[0]);
  }

  private updateProgress(event): void {
    this.progress = Math.round(event.loaded / event.total * 100);
  }

  private makeFileRequest(url: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('uploads[]', file, file.name);

    this.xhr = new XMLHttpRequest();
    this.xhr.onreadystatechange = () => {
      switch (this.xhr.readyState) { // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        case 1: // OPEN
          this.isSending = true;
          this.progress = 0;
          break;
        case 4: // DONE
          this.isSending = false;
          if (this.xhr.status === 200) {
            this.uploadSuccessful();
          } else {
            this.uploadFailed();
          }

          this.xhr = null;
          break;
        default:
          break;
      }
    };

    this.xhr.upload.onprogress = this.updateProgress.bind(this);
    this.xhr.open('POST', url, true);
    this.xhr.send(formData);
  }

  public abort(): void {
    this.xhr.onreadystatechange = null;
    this.xhr.abort();
    this.xhr = null;
    this.isSending = false;
    this.uploadError = false;
  }

  public reset(): void {
    this.xhr = null;
    this.isSending = false;
    this.uploadError = false;
    this.imgURL = null;
    this.sent = false;
    this.uploadError = false;
    this.progress = 0;
    this.currentFile = null;
  }

  public resetValue(): void {
    this.control.setValue('');
    this.reset();
  }

  private uploadSuccessful(): void {
    this.control.setValue(this.xhr.response);
    this.sent = true;
  }

  private uploadFailed(): void {
    this.uploadError = true;
  }

  public onExternalChange(): void {
    this.reset();
    if (this.control?.value) {
      this.preview(this.control.value);
      this.sent = true;
    }
  }

  public preview(file) {
    this.imgURL = file;
  }

  public subscribeExternalChange(): void {
    this.currentValue = this.control?.value;
    this.onExternalChange();

    this.control?.valueChanges.subscribe((data) => {
      if (JSON.stringify(this.currentValue) === JSON.stringify(data)) {
        return;
      }

      this.currentValue = data;
      this.setValue(this.currentValue);
      this.onExternalChange();
    });
  }

  public openPreviewDialog(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const options = {
      outsideClosable: true,
      body: {
        backgroundImage: this.imgURL,
      },
    };

    // this.dialogService.openBasicDialog(options);
  }
}

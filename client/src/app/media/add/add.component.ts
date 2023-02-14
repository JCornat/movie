import { Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '@shared/global/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SERVER_URL } from '@shared/config/config';

@Directive()
export abstract class MediaAddComponent implements OnInit {
  @ViewChild('inputFile', {static: false}) public inputFile!: ElementRef;

  public loading!: boolean;
  public isSending!: boolean;
  public error!: string | null;
  public uploadError!: string | null;

  public id!: string;
  public importId!: string;
  public mediaForm!: FormGroup;
  public formData!: { [key: string]: any };
  public type!: 'movie' | 'serie' | 'game';
  public ratings!: { value: string | number, label: string }[];
  public xhr!: XMLHttpRequest;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.buildType();
    this.buildForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public async onSubmit(): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = null;

    if (this.mediaForm.invalid) {
      this.error = 'Invalid form';
      return;
    }

    this.loading = true;

    try {
      // await this.add();
      // this.navigateBack();
    } catch (error) {
      this.error = error as string;
    } finally {
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract add(): Promise<void>;

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate([`/${this.type}`, 'search']);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public buildType(): void {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1];
    if (Global.isEmpty(type)) {
      throw {status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown`};
    }

    this.type = type as 'movie' | 'serie' | 'game';
  }

  public buildForm(): void {
    this.ratings = [
      {value: 6, label: 'Favourite'},
      {value: 5, label: 'Wonderful'},
      {value: 4, label: 'Great'},
      {value: 3, label: 'Good'},
      {value: 2, label: 'Mediocre'},
      {value: 1, label: 'Bad'},
      {value: 'todo', label: 'Todo'},
    ];

    this.mediaForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
    });

    this.mediaForm.valueChanges.subscribe((data) => {
      this.onValid(data)
    });
  }

  public makeFileRequest(url: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('uploads[]', file, file.name);

    this.xhr = new XMLHttpRequest();
    this.xhr.onreadystatechange = () => {
      switch (this.xhr.readyState) { // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        case 1: // OPEN
          this.isSending = true;
          break;
        case 4: // DONE
          this.isSending = false;
          if (this.xhr.status === 200) {
            this.uploadSuccessful(this.xhr.response);
          } else {
            this.uploadError = this.xhr.response;
          }

          this.xhr = null as any;
          break;
        default:
          break;
      }
    };

    this.xhr.open('POST', url, true);
    // this.xhr.setRequestHeader('X-Access-Token', this.tokenService.getToken());
    this.xhr.send(formData);
  }

  public uploadSuccessful(data: string): void {
    this.mediaForm.get('url')?.setValue(data);
  }

  public selectFile(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.inputFile.nativeElement.click();
  }

  public selectedFile(event: any): void {
    const files = event.target.files;
    if (Global.isEmpty(files)) {
      return;
    }

    this.makeFileRequest(`${SERVER_URL}/api/file`, files[0]);
  }
}

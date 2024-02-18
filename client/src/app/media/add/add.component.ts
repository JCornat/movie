import { Router } from '@angular/router';
import { Directive, ElementRef, inject, input, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RATINGS } from '@app/media/rating';
import { Global } from '@shared/global/global';
import { PanelService } from '@app/panel/panel.service';
import { MediaType, Medium, Rating, RatingDisplay } from '@app/interface';
import { MediaService } from '@app/media/media.service';
import { map, switchMap } from 'rxjs';
import { UploadApiService } from '@shared/api-services/upload/upload-api.service';
import { toSignal } from '@angular/core/rxjs-interop';

export type AddFormType = {
  id: FormControl<string>;
  title: FormControl<string>;
  year: FormControl<number>;
  url: FormControl<string>;
  rating: FormControl<Rating>;
};

type MediaPreview = Partial<{ title: string, year: number, url: string, rating: Rating }>;

@Directive()
export abstract class MediaAddComponent<T extends Medium> {
  readonly panelService = inject(PanelService);
  readonly router = inject(Router);
  readonly uploaderService = inject(UploadApiService);

  @ViewChild('inputFile', { static: true }) inputFile!: ElementRef;

  id = input<string | null>(null);

  readonly loadingAdd: Signal<boolean> = this.mediaService.loadingAdd;
  readonly loadingUpdate: Signal<boolean> = this.mediaService.loadingUpdate;
  readonly loadingPullOne: Signal<boolean> = this.mediaService.loadingPullOne;
  readonly errorAdd: Signal<string | null> = this.mediaService.errorAdd;
  readonly errorUpdate: Signal<string | null> = this.mediaService.errorUpdate;
  readonly errorPullOne: Signal<string | null> = this.mediaService.errorPullOne;
  readonly ratings: WritableSignal<RatingDisplay[]> = signal<RatingDisplay[]>([...RATINGS]);
  readonly mediaForm: FormGroup<AddFormType> = this.buildForm();
  readonly type: MediaType = this.buildType();
  readonly mediaPreview: Signal<MediaPreview | undefined> = this.getMediaPreview();

  constructor(
    public mediaService: MediaService<T>,
  ) {
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  onSubmit(): void {
    if (this.loadingAdd()) {
      return;
    }

    if (this.mediaForm.invalid) {
      return;
    }

    this.add();
  }

  selectFile(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.inputFile.nativeElement.click();
  }

  selectedFile(event: any): void {
    const files = event.target.files;
    if (Global.isEmpty(files)) {
      return;
    }

    this.uploaderService.uploadFile(files[0]).subscribe(
      (data) => this.uploadSuccessful(data),
    );
  }

  close(): void {
    this.panelService.close();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  add(): void {
    this.mediaService.add(this.toMedium()).pipe(
      switchMap(() => this.mediaService.pullAll()),
    )
      .subscribe(() => this.close());
  }

  remove(): void {
    const id = this.id();
    if (!id) {
      return;
    }

    this.mediaService.delete(id)
      .pipe(
        switchMap(() => this.mediaService.pullAll()),
      )
      .subscribe(() => this.close());
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  buildType(): MediaType {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1] as MediaType;
    if (Global.isEmpty(type)) {
      throw { status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown` };
    }

    return type;
  }

  buildForm(): FormGroup<AddFormType> {
    return new FormGroup<AddFormType>({
      id: new FormControl('', { nonNullable: true }),
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      year: new FormControl(new Date().getFullYear(), { nonNullable: true, validators: [Validators.required] }),
      url: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      rating: new FormControl('todo', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  uploadSuccessful(data: string): void {
    this.mediaForm.controls.url.setValue(data);
  }

  protected toMedium(): T {
    return this.mediaForm.getRawValue() as T;
  }

  protected getMediaPreview(): Signal<MediaPreview | undefined> {
    return toSignal(this.mediaForm.valueChanges.pipe(
      map((): MediaPreview => this.mediaForm.getRawValue()),
    ));
  }
}

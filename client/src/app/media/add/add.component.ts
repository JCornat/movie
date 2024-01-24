import { Router } from '@angular/router';
import { Directive, ElementRef, inject, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { RATINGS } from '@app/media/rating';
import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';
import { SerieService } from '@app/serie/serie.service';
import { Global } from '@shared/global/global';
import { PanelService } from '@app/panel/panel.service';
import { RatingDisplay } from '@app/interface';

@Directive()
export abstract class MediaAddComponent {
  requestService = inject(RequestService);
  panelService = inject(PanelService);
  router = inject(Router);

  @ViewChild('inputFile', { static: true }) inputFile!: ElementRef;

  id = input<string | null>(null);

  loadingAdd = this.mediaService.loadingAdd;
  loadingUpdate = this.mediaService.loadingUpdate;
  loadingPullOne = this.mediaService.loadingPullOne;
  errorAdd = this.mediaService.errorAdd;
  errorUpdate = this.mediaService.errorUpdate;
  errorPullOne = this.mediaService.errorPullOne;
  formData = signal<{ [key: string]: any } | null>(null);
  ratings = signal<RatingDisplay[]>([...RATINGS]);
  mediaForm = this.buildForm();
  type = this.buildType();

  constructor(
    public mediaService: SerieService | MovieService | GameService,
  ) {
    this.subscribeForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }

  async onSubmit(): Promise<void> {
    if (this.loadingAdd()) {
      return;
    }

    if (this.mediaForm().invalid) {
      return;
    }

    await this.add();
  }

  selectFile(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.inputFile.nativeElement.click();
  }

  async selectedFile(event: any): Promise<void> {
    const files = event.target.files;
    if (Global.isEmpty(files)) {
      return;
    }

    const data = await this.requestService.upload(`${SERVER_URL}/api/file`, files[0]);
    this.uploadSuccessful(data);
  }

  close(): void {
    this.panelService.close();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async add(): Promise<void> {
    await this.mediaService.add(this.formData()!);
    this.close();
  }

  async remove(): Promise<void> {
    if (!this.id()) {
      return;
    }

    await this.mediaService.delete(this.id()!);
    this.close();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  buildType(): WritableSignal<'movie' | 'serie' | 'game'> {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1] as 'movie' | 'serie' | 'game';
    if (Global.isEmpty(type)) {
      throw { status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown` };
    }

    return signal(type);
  }

  buildForm(): WritableSignal<FormGroup> {
    const form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
    });

    return signal(form);
  }

  uploadSuccessful(data: string): void {
    this.mediaForm().get('url')?.setValue(data);
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeForm(): void {
    this.mediaForm().valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}

import { Router } from '@angular/router';
import { Directive, ElementRef, inject, input, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { RATINGS } from '@app/media/rating';
import { RequestService } from '@shared/request/request.service';
import { getConfig } from '@shared/config/config.provider';
import { SerieService } from '@app/serie/serie.service';
import { Global } from '@shared/global/global';
import { PanelService } from '@app/panel/panel.service';
import { Medium, RatingDisplay } from '@app/interface';

@Directive()
export abstract class MediaAddComponent {
  requestService = inject(RequestService);
  panelService = inject(PanelService);
  router = inject(Router);
  serverUrl = getConfig('SERVER_URL');

  readonly inputFile = viewChild.required<ElementRef>('inputFile');

  readonly id = input<string | null>(null);

  readonly loadingAdd = this.mediaService.loadingAdd;
  readonly loadingUpdate = this.mediaService.loadingUpdate;
  readonly loadingPullOne = this.mediaService.loadingPullOne;
  readonly errorAdd = this.mediaService.errorAdd;
  readonly errorUpdate = this.mediaService.errorUpdate;
  readonly errorPullOne = this.mediaService.errorPullOne;
  readonly formData = signal<{ [key: string]: any } | null>(null);
  readonly ratings = signal<RatingDisplay[]>([...RATINGS]);
  readonly mediaForm = this.buildForm();
  readonly type = this.buildType();

  constructor(
    public mediaService: SerieService | MovieService | GameService,
  ) {
    this.subscribeForm();
  }

  //region Template
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

    this.inputFile().nativeElement.click();
  }

  async selectedFile(event: any): Promise<void> {
    const files = event.target.files;
    if (Global.isEmpty(files)) {
      return;
    }

    const data = await this.requestService.upload(`${this.serverUrl}/api/file`, files[0]);
    this.uploadSuccessful(data);
  }

  close(): void {
    this.panelService.close();
  }
  //endregion

  //region Servie
  async add(): Promise<void> {
    const formData = this.formData() as Medium;
    await this.mediaService.add(formData);
    this.mediaService.pullAll(); // Refresh the list
    this.close();
  }

  async remove(): Promise<void> {
    const id = this.id() as string;
    if (!id) {
      return;
    }

    await this.mediaService.delete(id);
    this.mediaService.pullAll(); // Refresh the list
    this.close();
  }
  //endregion

  //region Method
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

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }
  //endregion

  //region Subscribe
  subscribeForm(): void {
    this.mediaForm().valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.onValid(data);
      });
  }
  //endregion
}

import { inject, Injectable, Injector } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { MediaAddComponent } from '../add/add.component';
import { Global } from '@shared/global/global';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {
  inject = inject(Injector);

  override ngOnInit(): void {
    if (!this.id) {
      throw new Error('NO ID PROVIDED');
    }

    this.buildType();
    this.buildForm();
    this.subscribePullOne();

    this.loading = true;
    this.pullOne(this.id);
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  override async onSubmit(): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = null;
    this.loading = true;

    try {
      await this.update(this.formData);
      this.close();
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async pullOne(id: string): Promise<void> {
    return await this.mediaService.pullOne(id);
  }

  async update(data: { [key: string]: any }): Promise<void> {
    await this.mediaService.update(data);
  }

  /*-----------------------*\
          Observable
  \*-----------------------*/

  subscribePullOne(): void {
    toObservable(this.mediaService.valuesPullOne, { injector: this.inject })
      .subscribe((value) => {
        if (Global.isEmpty(value)) {
          return;
        }

        this.mediaForm.patchValue(value as any);
        this.loading = false;
      });
  }
}

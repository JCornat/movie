import { Injectable } from '@angular/core';
import * as Global from '@shared/global/global';

import { Media } from '@app/media/media';
import { MediaAddComponent } from '../add/add.component';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {
  public override async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (Global.isEmpty(this.id)) {
      return;
    }

    this.init();

    this.error = null;
    this.loading = true;

    try {
      const values = await this.pullOne(this.importId);
      this.mediaForm.patchValue(values);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public override async onSubmit(): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = null;
    this.loading = true;

    try {
      await this.update(this.formData);
      this.navigateBack();
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<Media> {
    return this.mediaService.pullOne(this.id);
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.mediaService.update(data);
  }
}

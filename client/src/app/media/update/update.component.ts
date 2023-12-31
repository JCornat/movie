import { Injectable } from '@angular/core';

import { MediaAddComponent } from '../add/add.component';
import { Media } from '@app/interface';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {
  override async ngOnInit(): Promise<void> {
    if (!this.id) {
      throw new Error('NO ID PROVIDED');
    }

    this.init();

    this.error = null;
    this.loading = true;

    try {
      const values = await this.pullOne(this.id);
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

  override async onSubmit(): Promise<void> {
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

  async pullOne(id: string): Promise<Media> {
    return await this.mediaService.pullOne(id);
  }

  async update(data: { [key: string]: any }): Promise<void> {
    await this.mediaService.update(data);
  }
}

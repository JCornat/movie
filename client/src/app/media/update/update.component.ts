import { Injectable } from '@angular/core';
import * as Global from '@shared/global/global';

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

  public abstract pullOne(id: string): Promise<any>;

  public abstract update(data: { [key: string]: any }): Promise<void>;
}

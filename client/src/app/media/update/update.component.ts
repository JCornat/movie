import { Injectable, effect, inject } from '@angular/core';

import { Media } from '@app/media/media';
import { MediaAddComponent } from '../add/add.component';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {

  constructor() {
    super();
    // TODO avoid effect and trigger fetch directly in subscriber?
    effect( () => {
      this.performFetch(this.id());
    })  
  }

  async performFetch(id:string){
    this.error = null;
    if(this.mediaForm?.getRawValue() == null){
      this.loading = true;
    }

    try {
      const values = await this.pullOne(id);
      this.mediaForm.patchValue(values);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }
  
  override async ngOnInit(): Promise<void> {
    if (!this.id) {
      throw new Error('NO ID PROVIDED');
    }

    this.init(); 
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
    return this.mediaService.pullOne(id);
  }

  async update(data: { [key: string]: any }): Promise<void> {
    await this.mediaService.update(data);
  }
}

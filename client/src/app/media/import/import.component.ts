import { Directive, OnInit, Input } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { Global } from '@shared/global/global';
import { ImportMedia } from '@app/interface';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  @Input() importId!: string;

  override async ngOnInit(): Promise<void> {
    if (Global.isEmpty(this.importId)) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    this.init();

    const values = await this.pullOne(this.importId);
    this.mediaForm.patchValue(values);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async pullOne(id: string): Promise<ImportMedia> {
    if (!id) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    this.error = null as any;
    this.loading = true;

    let data: any;

    try {
      data = await this.mediaService.importOne(id);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }

    return data;
  }
}

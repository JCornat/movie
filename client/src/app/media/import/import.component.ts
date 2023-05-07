import { Directive, OnInit } from '@angular/core';

import { ImportMedia } from '@app/media/media';
import { MediaAddComponent } from '@app/media/add/add.component';
import * as Global from '@shared/global/global';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  public override async ngOnInit(): Promise<void> {
    this.importId = this.route.snapshot.paramMap.get('importId') || '';
    if (Global.isEmpty(this.importId)) {
      return;
    }

    this.init();

    const values = await this.pullOne(this.importId);
    this.mediaForm.patchValue(values);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract pullOne(id: string): Promise<ImportMedia>;
}

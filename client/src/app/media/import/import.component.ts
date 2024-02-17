import { Directive, input, OnInit } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { Global } from '@shared/global/global';
import { Medium } from '@app/interface';
import { MediaService } from '@app/media/media.service';

@Directive()
export abstract class MediaImportComponent<T extends Medium> extends MediaAddComponent<T> implements OnInit {
  importId = input<string>();

  constructor(
    public override mediaService: MediaService<T>,
  ) {
    super(mediaService);
  }

  async ngOnInit(): Promise<void> {
    if (Global.isEmpty(this.importId())) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    this.buildType();
    this.buildForm();

    this.pullOne(this.importId());
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  pullOne(id: string | null | undefined): void {
    if (!id) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    this.mediaService.importOne(id).subscribe(
      (value) => this.mediaForm.patchValue(value),
    );
  }
}

import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaAddComponent } from '../add/add.component';
import * as Global from '@shared/global/global';
import { RequestService } from '@shared/request/request.service';
import { ImportMedia } from '@app/media/media';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  constructor(
    public override requestService: RequestService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(requestService, route, router);
  }

  public override async ngOnInit(): Promise<void> {
    this.importId = this.route.snapshot.paramMap.get('importId') || '';
    if (Global.isEmpty(this.importId)) {
      return;
    }

    this.init();

    const values = await this.pullOne(this.importId);
    console.log('values', values);
    this.mediaForm.patchValue(values);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract pullOne(id: string): Promise<ImportMedia>;
}

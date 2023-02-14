import { Directive, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '@shared/global/global';

import { MediaAddComponent } from '../add/add.component';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {
  constructor(
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(route, router);
  }

  public override async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (Global.isEmpty(this.id)) {
      return;
    }

    this.init();

    const values = await this.pullOne(this.importId);
    this.mediaForm.patchValue(values);
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
      this.error = error as string;
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    //
  }

  public abstract pullOne(id: string): Promise<any>;

  public abstract remove(): Promise<void>;

  public abstract update(data: { [key: string]: any }): Promise<void>;
}

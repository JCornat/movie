import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaAddComponent } from '../add/add.component';
import * as Global from '@shared/global/global';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  public posterImage!: string;
  public loadingAdd!: boolean;
  public errorAdd!: string;

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
    this.values = await this.pullOne(this.id);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract pullOne(id: string): Promise<{ title: string, year: number, url: string }>;
}
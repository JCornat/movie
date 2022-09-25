import { Directive, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediumAddComponent } from '../add/add.component';

@Injectable()
export abstract class MediumUpdateComponent extends MediumAddComponent implements OnInit {
  public id!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    super();
  }

  public override async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    await this.pullOne(this.id);

    this.init();
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

  public abstract pullOne(id: string): Promise<void>;

  public abstract remove(): Promise<void>;

  public abstract update(data: { [key: string]: any }): Promise<void>;
}

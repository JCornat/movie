import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediumAddComponent } from '../add/add.component';

@Directive()
export abstract class MediumUpdateComponent extends MediumAddComponent implements OnInit {
  public id: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    await this.pullOne(this.id);

    this.init();
  }

  public abstract pullOne(id: string): Promise<void>;

  public abstract remove(): Promise<void>;

  public abstract update(data): Promise<void>;

  public abstract onSubmit(): Promise<void>;
}

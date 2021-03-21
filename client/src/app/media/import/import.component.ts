import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaAddComponent } from '../add/add.component';

export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  public id: string;
  public posterImage: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');

    this.init();
    this.values = await this.pullOne(this.id);
  }

  public abstract pullOne(id: string): Promise<{ title: string, year: number, url: string }>;

  public abstract onSubmit(): Promise<void>;
}

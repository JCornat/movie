import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MediaAddComponent } from '../add/add.component';

export abstract class MediaUpdateComponent extends MediaAddComponent implements OnInit {
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

  public async onSubmit(): Promise<void> {
    await this.update(this.formData);
    this.router.navigate(['/']);
  }
}

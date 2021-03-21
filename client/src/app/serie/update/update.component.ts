import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediumUpdateComponent } from '../../medium/update/update.component';

@Component({
  selector: 'serie-update',
  templateUrl: '../../medium/update/update.component.html',
})
export class SerieUpdateComponent extends MediumUpdateComponent {
  public id: string;

  constructor(
    public serieService: SerieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
  }

  public async pullOne(id: string): Promise<void> {
    this.values = await this.serieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.serieService.delete(this.id);
    this.router.navigate(['/serie']);
  }

  public async update(data): Promise<void> {
    await this.serieService.update(data);
  }
}

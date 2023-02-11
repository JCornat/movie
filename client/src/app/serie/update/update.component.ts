import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaUpdateComponent } from '../../media/update/update.component';

@Component({
  selector: 'serie-update',
  templateUrl: '../../media/update/update.component.html',
})
export class SerieUpdateComponent extends MediaUpdateComponent {
  constructor(
    public serieService: SerieService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<void> {
    this.values = await this.serieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.serieService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.serieService.update(data);
  }
}

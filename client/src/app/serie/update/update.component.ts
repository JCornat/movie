import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaUpdateComponent } from '../../media/update/update.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'serie-update',
  templateUrl: '../../media/add/add.component.html',
})
export class SerieUpdateComponent extends MediaUpdateComponent {
  constructor(
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
    public serieService: SerieService,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<any> {
    return this.serieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.serieService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.serieService.update(data);
  }
}

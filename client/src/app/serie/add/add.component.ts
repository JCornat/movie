import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaAddComponent } from '../../media/add/add.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
})
export class SerieAddComponent extends MediaAddComponent {
  constructor(
    public override requestService: RequestService,
    public override route: ActivatedRoute,
    public override router: Router,
    public serieService: SerieService,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.serieService.add(this.formData);
  }
}

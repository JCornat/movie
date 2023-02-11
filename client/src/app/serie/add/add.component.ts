import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaAddComponent } from '../../media/add/add.component';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
})
export class SerieAddComponent extends MediaAddComponent {
  constructor(
    public serieService: SerieService,
    public override route: ActivatedRoute,
    public override router: Router,
  ) {
    super(route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.serieService.add(this.formData);
  }
}

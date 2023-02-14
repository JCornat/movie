import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaImportComponent } from '../../media/import/import.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'serie-import',
  templateUrl: '../../media/add/add.component.html',
})
export class SerieImportComponent extends MediaImportComponent implements OnInit {
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

  public async add(): Promise<void> {
    await this.serieService.add(this.formData);
  }

  public async pullOne(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    const data = await this.serieService.importOne(id);
    this.posterImage = data.backgroundImage;

    return {
      title: data.title,
      year: data.year,
      url: data.backgroundImage,
    };
  }
}

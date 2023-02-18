import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaImportComponent } from '../../media/import/import.component';
import { RequestService } from '@shared/request/request.service';
import { ImportMedia } from '@app/media/media';

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

  public override async add(): Promise<void> {
    await this.serieService.add(this.formData);
  }

  public async pullOne(id: string): Promise<ImportMedia> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    this.error = null as any;
    this.loading = true;

    let data: any;

    try {
      data = await this.serieService.importOne(id);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }

    return data;
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaSearchComponent } from '@app/media/search/search.component';
import { RequestService } from '@shared/request/request.service';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
})
export class SerieSearchComponent extends MediaSearchComponent {
  constructor(
    public serieService: SerieService,
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public override async search(title: string): Promise<void> {
    this.error = null as any;
    this.loading = true;

    try {
      this.searchResults = await this.serieService.search(title);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }
}

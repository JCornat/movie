import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaSearchComponent } from '../../media/search/search.component';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
})
export class SerieSearchComponent extends MediaSearchComponent {
  constructor(
    public serieService: SerieService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async search(title: string): Promise<any> {
    this.results = await this.serieService.search(title);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/serie']);
  }

  public navigateAdd(): void {
    this.router.navigate(['/serie/add']);
  }

  public navigateImport(id: string): void {
    this.router.navigate(['/serie/import', id]);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediumSearchComponent } from '../../medium/search/search.component';

@Component({
  selector: 'serie-search',
  templateUrl: '../../medium/search/search.component.html',
})
export class SerieSearchComponent extends MediumSearchComponent {
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

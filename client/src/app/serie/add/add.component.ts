import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediaAddComponent } from '../../media/add/add.component';

@Component({
  selector: 'serie-add',
  templateUrl: '../../media/add/add.component.html',
})
export class SerieAddComponent extends MediaAddComponent {
  constructor(
    public serieService: SerieService,
    public router: Router,
  ) {
    super();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async add(): Promise<void> {
    await this.serieService.add(this.formData);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate(['/serie']);
  }
}

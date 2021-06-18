import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'serie-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class SerieAddComponent extends MediumAddComponent {
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

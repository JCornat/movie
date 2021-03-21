import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { MediumImportComponent } from '../../medium/import/import.component';

@Component({
  selector: 'serie-import',
  templateUrl: '../../medium/import/import.component.html',
})
export class SerieImportComponent extends MediumImportComponent implements OnInit {
  public id: string;
  public posterImage: string;

  constructor(
    public serieService: SerieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(route, router);
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

  public async onSubmit(): Promise<void> {
    await this.serieService.add(this.formData);
    this.router.navigate(['/serie/search']);
  }
}

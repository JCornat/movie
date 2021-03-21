import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../../question/question';
import { SerieService } from '../serie.service';
import { MediumAddComponent } from '../../medium/add/add.component';

@Component({
  selector: 'serie-add',
  templateUrl: '../../medium/add/add.component.html',
})
export class SerieAddComponent extends MediumAddComponent {
  public questions: Question[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public serieService: SerieService,
    public router: Router,
  ) {
    super();
  }

  public async onSubmit(): Promise<void> {
    await this.serieService.add(this.formData);
    this.router.navigate(['/serie']);
  }
}

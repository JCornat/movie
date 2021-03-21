import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SerieService } from '../serie.service';
import { Question } from '../../question/question';
import { MediumSearchComponent } from '../../medium/search/search.component';

@Component({
  selector: 'serie-search',
  templateUrl: '../../medium/search/search.component.html',
})
export class SerieSearchComponent extends MediumSearchComponent {
  public questions: Question[];
  public results: { title: string, year: number, backgroundImage: string }[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public serieService: SerieService,
    public router: Router,
  ) {
    super();
  }

  public async search(title: string): Promise<any> {
    this.results = await this.serieService.search(title);
  }

  public select(result: any): void {
    this.router.navigate(['/serie/import', result.id]);
  }

  public navigateAdd(): void {
    this.router.navigate(['/serie/add']);
  }
}

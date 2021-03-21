import { OnInit } from '@angular/core';

import { Question } from '../../question/question';

export abstract class MediaSearchComponent implements OnInit {
  public questions: Question[];
  public results: { title: string, year: number, backgroundImage: string }[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor() {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.questions = [
      {key: 'search', type: 'text', label: 'Titre', required: true, marginBottom: 0},
    ];
  }

  public onValid(data): void {
    this.formData = data;
  }

  public abstract search(title: string): Promise<void>;

  public abstract select(result: any): void;

  public async onSubmit(): Promise<void> {
    if (!this.formData) {
      return;
    }

    this.search(this.formData.search);
  }

  public abstract navigateAdd(): void;
}

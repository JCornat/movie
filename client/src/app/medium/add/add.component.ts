import { Directive, OnInit } from '@angular/core';

import { Question } from '../../question/question';

@Directive()
export abstract class MediumAddComponent implements OnInit {
  public loading: boolean;
  public error: string;

  public questions: Question[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor() {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    const values: Question['values'] = [
      {value: 'todo', label: 'A voir'},
    ];

    this.questions = [
      {key: '_id', type: 'text', label: 'id', hide: true},
      {key: 'title', type: 'text', label: 'Titre'},
      {key: 'year', type: 'number', label: 'Année'},
      {key: 'url', type: 'text', label: 'URL du Poster'},
      {key: 'backgroundImage', type: 'file', label: 'Poster (300x450)', content: 'http://localhost:3000/api/file'},
      {key: 'rating', type: 'number', label: 'Note'},
      {key: 'tags', type: 'checkbox', label: 'Tags', values},
    ];
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onValid(data): void {
    this.formData = data;
  }

  public async onSubmit(): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = null;
    this.loading = true;

    try {
      await this.add();
      this.navigateBack();
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract add(): Promise<void>;

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public abstract navigateBack(): void;
}

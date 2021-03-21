import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from '../../question/question';

export abstract class MediaAddComponent implements OnInit {
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

  public onValid(data): void {
    this.formData = data;
  }

  abstract onSubmit(): Promise<void>;
}

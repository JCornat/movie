import { Component, OnInit } from '@angular/core';
import { Question } from '../../question/question';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class MovieAddComponent implements OnInit {
  public questions: Question[];

  public values: { [key: string]: any };
  public formData: FormData;

  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
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
      {key: 'backgroundImage', type: 'file', label: 'Poster (300x450)', content: 'http://localhost:3000/api/file'},
      {key: 'rating', type: 'number', label: 'Note'},
      {key: 'tags', type: 'checkbox', label: 'Tags', values},
    ];
  }

  public onValid(data): void {
    this.formData = data;
  }

  public async onSubmit(): Promise<void> {
    await this.movieService.add(this.formData);
    this.router.navigate(['/']);
  }
}

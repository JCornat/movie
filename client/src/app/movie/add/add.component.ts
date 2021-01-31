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
  public questions: Question[] = [
    {key: '_id', type: 'text', label: 'id', hide: true},
    {key: 'title', type: 'text', label: 'title'},
    {key: 'year', type: 'number', label: 'year'},
    {key: 'backgroundImage', type: 'text', label: 'image'},
    {key: 'rating', type: 'number', label: 'rating'},
  ];

  public values: any;
  public formData: any;

  constructor(
    public movieService: MovieService,
    public router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    //
  }

  public onValid(data): void {
    this.formData = data;
  }

  public async onSubmit(): Promise<void> {
    await this.movieService.add(this.formData);
    this.router.navigate(['/']);
  }
}

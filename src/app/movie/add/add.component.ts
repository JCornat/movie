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
    {key: 'id', type: 'number', label: 'id'},
    {key: 'title', type: 'text', label: 'title'},
    {key: 'year', type: 'number', label: 'year'},
    {key: 'backgroundImage', type: 'text', label: 'image'},
    {key: 'rating', type: 'number', label: 'rating'},
  ];

  public values: any;
  public formData: any;

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    //
  }

  public onValid(data) {
    this.formData = data;
  }

  public onSubmit() {
    this.movieService.movies.push(this.formData);
    this.router.navigate(['/']);
  }
}

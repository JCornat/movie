import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Question } from '../../question/question';
import { MOVIEDB_API_KEY } from '../../config/config';

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  public questions: Question[];
  public results: any[];

  public values: { [key: string]: any };
  public formData: { [key: string]: any };

  constructor(
    public http: HttpClient,
    public movieService: MovieService,
    public router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.questions = [
      {key: 'search', type: 'text', label: 'Titre', required: true},
    ];
  }

  public onValid(data): void {
    this.formData = data;
  }

  public async search(title: string): Promise<any> {
    const data: any = await this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&query=${title.replace(/ /g, '+')}`).toPromise();
    console.log(data);
    this.results = data.results;
  }

  public select(result: any): void {
    this.router.navigate(['/import', result.id]);
  }

  public async onSubmit(): Promise<void> {
    if (!this.formData) {
      return;
    }

    this.search(this.formData.search);
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieAddComponent } from '../add/add.component';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'movie-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class MovieImportComponent extends MovieAddComponent implements OnInit {
  public id: string;
  public posterImage: string;

  constructor(
    public movieService: MovieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(movieService, router);
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');

    this.init();
    this.values = await this.pullOne(this.id);
  }

  public async pullOne(id: string): Promise<any> {
    if (!id) {
      throw new Error('ID incorrect');
    }

    const data = await this.movieService.importOne(id);
    this.posterImage = data.backgroundImage;

    return {
      title: data.title,
      year: data.year,
      url: data.backgroundImage,
    };
  }

  public async onSubmit(): Promise<void> {
    await this.movieService.add(this.formData);
    this.router.navigate(['/search']);
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieAddComponent } from '../add/add.component';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'movie-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class MovieUpdateComponent extends MovieAddComponent implements OnInit {
  public id: string;

  constructor(
    public movieService: MovieService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(movieService, router);
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.values = await this.movieService.pullOne(this.id);
  }

  public async remove(): Promise<void> {
    await this.movieService.delete(this.id);
  }

  public async update(data): Promise<void> {
    await this.movieService.update(data);
  }

  public async onSubmit(): Promise<void> {
    await this.update(this.formData);
    this.router.navigate(['/']);
  }
}

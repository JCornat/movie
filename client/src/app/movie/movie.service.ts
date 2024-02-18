import { MediaService } from '@app/media/media.service';
import { Movie } from '@app/interface';
import { MovieApiService } from '@shared/api-services/movie/movie-api.service';
import { inject, Injectable } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends MediaService<Movie> {
  protected readonly apiService: MediumApiService<Movie> = inject(MovieApiService);
}

import { Injectable } from '@angular/core';

import { BaseMediumApiService } from '../../../../core/services/base-api/base-medium-api.service';
import { MovieInterface } from '../../models/movie/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends BaseMediumApiService<MovieInterface> {
  public readonly baseUrl: string = 'api/movie';
}

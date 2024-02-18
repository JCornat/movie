import { Injectable } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { MediaType, Movie } from '@app/interface';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService extends MediumApiService<Movie> {
  protected readonly resourceName: Readonly<MediaType> = 'movie';
}

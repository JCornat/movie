import { Injectable } from '@angular/core';

import { MediaType, Movie } from '@app/interface';
import { MediaService } from '@app/media/media.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends MediaService<Movie> {
  type = 'movie' as MediaType;
}

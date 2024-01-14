import { Injectable } from '@angular/core';

import { MediaType, Serie } from '@app/interface';
import { MediaService } from '@app/media/media.service';

@Injectable({
  providedIn: 'root',
})
export class SerieService extends MediaService<Serie> {
  type = 'serie' as MediaType;
}

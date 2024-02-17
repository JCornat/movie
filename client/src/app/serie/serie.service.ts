import { Serie } from '@app/interface';
import { inject, Injectable } from '@angular/core';
import { MediaService } from '@app/media/media.service';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { SerieApiService } from '@shared/api-services/serie/serie-api.service';

@Injectable({
  providedIn: 'root',
})
export class SerieService extends MediaService<Serie> {
  protected readonly apiService: MediumApiService<Serie> = inject(SerieApiService);
}

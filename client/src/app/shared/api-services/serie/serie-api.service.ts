import { Injectable } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { MediaType, Serie } from '@app/interface';

@Injectable({
  providedIn: 'root',
})
export class SerieApiService extends MediumApiService<Serie> {
  protected readonly resourceName: Readonly<MediaType> = 'serie';
}

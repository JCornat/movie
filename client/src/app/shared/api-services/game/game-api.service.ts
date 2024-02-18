import { Injectable } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { Game, MediaType } from '@app/interface';

@Injectable({
  providedIn: 'root',
})
export class GameApiService extends MediumApiService<Game> {
  protected readonly resourceName: MediaType = 'game';
}

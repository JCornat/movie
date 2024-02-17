import { MediaService } from '@app/media/media.service';
import { Game } from '@app/interface';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { inject, Injectable } from '@angular/core';
import { GameApiService } from '@shared/api-services/game/game-api.service';

@Injectable({
  providedIn: 'root',
})
export class GameService extends MediaService<Game> {
  protected readonly apiService: MediumApiService<Game> = inject(GameApiService);
}

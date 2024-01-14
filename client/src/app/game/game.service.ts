import { Injectable } from '@angular/core';

import { Game, MediaType } from '@app/interface';
import { MediaService } from '@app/media/media.service';

@Injectable({
  providedIn: 'root',
})
export class GameService extends MediaService<Game> {
  type = 'game' as MediaType;
}

import { Directive, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { MediaAddComponent } from '@app/media/add/add.component';
import { ImportMedia } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';
import { MovieService } from '@app/movie/movie.service';
import { GameService } from '@app/game/game.service';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent {
  readonly importId = input.required<string>();

  constructor(
    public override mediaService: SerieService | MovieService | GameService,
  ) {
    super(mediaService);

    this.subscribeImportId();
  }

  //region Service
  async pullOne(id: string): Promise<ImportMedia> {
    if (!id) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    return await this.mediaService.importOne(id);
  }
  //endregion

  //region Subscribe
  subscribeImportId() {
    toObservable(this.importId).pipe(filter(Boolean)).subscribe(async (value) => {
      const values = await this.pullOne(value);
      this.mediaForm().patchValue(values);
    });
  }
  //endregion
}

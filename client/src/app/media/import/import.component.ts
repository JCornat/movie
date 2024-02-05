import { Directive, input, OnInit } from '@angular/core';

import { MediaAddComponent } from '@app/media/add/add.component';
import { Global } from '@shared/global/global';
import { ImportMedia } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';
import { MovieService } from '@app/movie/movie.service';
import { GameService } from '@app/game/game.service';

@Directive()
export abstract class MediaImportComponent extends MediaAddComponent implements OnInit {
  importId = input<string>();

  constructor(
    public override mediaService: SerieService | MovieService | GameService,
  ) {
    super(mediaService);
  }

  async ngOnInit(): Promise<void> {
    if (Global.isEmpty(this.importId())) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    this.buildType();
    this.buildForm();

    const values = await this.pullOne(this.importId()!);
    this.mediaForm().patchValue(values);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async pullOne(id: string): Promise<ImportMedia> {
    if (!id) {
      throw new Error('NO IMPORT ID PROVIDED');
    }

    return await this.mediaService.importOne(id);
  }
}

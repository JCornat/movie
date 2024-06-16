import { inject, Injectable, Injector } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { MediaAddComponent } from '../add/add.component';
import { Global } from '@shared/global/global';
import { SerieService } from '@app/serie/serie.service';
import { MovieService } from '@app/movie/movie.service';
import { GameService } from '@app/game/game.service';
import { Medium } from '@app/interface';

@Injectable()
export abstract class MediaUpdateComponent extends MediaAddComponent {
  inject = inject(Injector);

  constructor(
    public override mediaService: SerieService | MovieService | GameService,
  ) {
    super(mediaService);

    this.subscribePullOne();
    this.subscribeId();
  }

  //region Template
  override async onSubmit(): Promise<void> {
    if (this.loadingUpdate()) {
      return;
    }

    await this.update(this.formData() as Medium);
  }
  //endregion

  //region Service
  async pullOne(id: string): Promise<void> {
    return await this.mediaService.pullOne(id);
  }

  async update(data: Medium): Promise<void> {
    await this.mediaService.update(data);
    this.mediaService.pullAll(); // Refresh the list
    this.close();
  }
  //endregion

  //region Subscribe
  subscribePullOne(): void {
    toObservable(this.mediaService.valuesPullOne)
      .subscribe((value) => {
        if (Global.isEmpty(value)) {
          return;
        }

        this.mediaForm().patchValue(value as any);
      });
  }

  subscribeId(): void {
    toObservable(this.id)
      .subscribe((value) => {
        if (Global.isEmpty(value)) {
          return;
        }

        this.pullOne(this.id()!);
      });
  }
  //endregion
}

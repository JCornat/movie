import { effect, inject, Injectable, Injector, OnInit } from '@angular/core';

import { MediaAddComponent } from '../add/add.component';
import { Global } from '@shared/global/global';
import { Medium } from '@app/interface';
import { MediaService } from '@app/media/media.service';
import { switchMap } from 'rxjs';

@Injectable()
export abstract class MediaUpdateComponent<T extends Medium> extends MediaAddComponent<T> implements OnInit {
  protected readonly inject = inject(Injector);

  constructor(
    public override mediaService: MediaService<T>,
  ) {
    super(mediaService);

    this.subscribePullOne();
  }

  ngOnInit(): void {
    this.pullMedia();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  override onSubmit(): void {
    if (this.loadingUpdate()) {
      return;
    }

    this.update(this.toMedium());
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  update(data: T): void {
    this.mediaService.update(data).pipe(
      switchMap(() => this.mediaService.pullAll()),
    )
      .subscribe(() => this.close());
  }

  /*-----------------------*\
          Observable
  \*-----------------------*/

  subscribePullOne(): void {
    effect(() => {
      const value = this.mediaService.valuesPullOne();
      if (Global.isEmpty(value)) {
        return;
      }

      this.mediaForm.patchValue(value as any);
    });
  }

  protected pullMedia(): void {
    this.mediaService.pullOne(this.id()!).subscribe();
  }
}

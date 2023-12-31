import { computed, Directive, inject, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { ScreenService } from '@shared/screen/screen.service';
import { GroupMedium, Media } from '@app/interface';
import * as Global from '@shared/global/global';
import { RATINGS } from '@app/media/rating';
import { Subscription } from 'rxjs';

@Directive()
export abstract class MediaService implements OnDestroy {
  screenService = inject(ScreenService);

  searchTerm: WritableSignal<string> = signal('');
  media: WritableSignal<Media[]> = signal([]);
  groupMedia: Signal<GroupMedium[]> = this.computeGroupMedia();
  resizeSubscriber!: Subscription;

  constructor() {
    this.subscribeResize();
  }

  ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  increaseLimit(groupMedium: GroupMedium): void {
    const newLimit = this.getLimitByScreenSize();
    groupMedium.limit += newLimit * 4;
  }

  sort(item: GroupMedium, type: string): void {
    item.orderBy = type;

    if (type === 'random') {
      this.shuffle(item.media);
      return;
    }

    const key = (type === 'alphabetic') ? 'title' : 'year';
    item.media = Global.sort({ data: item.media, key });
  }

  shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getLimitByScreenSize(): number {
    if (this.screenService.isMobile()) {
      return 5;
    } else if (this.screenService.isTablet()) {
      return 8;
    } else if (this.screenService.isLaptop()) {
      return 8;
    } else if (this.screenService.isDesktop()) {
      return 11;
    } else {
      return 17;
    }
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  computeGroupMedia(): Signal<GroupMedium[]> {
    return computed(() => {
      const limit = this.getLimitByScreenSize();

      const ratingsObj: Record<string, GroupMedium> = {};
      for (const rating of RATINGS) {
        const groupMedium: GroupMedium = {
          label: rating.label,
          value: rating.value,
          limit,
          orderBy: 'random',
          media: [],
        };

        ratingsObj[rating.value] = groupMedium;
      }

      for (const datum of this.media()) {
        const search = this.searchTerm();
        if (search) {
          if (!(datum.year + '').includes(search) && !(datum.title.toLowerCase()).includes(search.toLowerCase())) {
            continue;
          }
        }

        let rating = ratingsObj[datum.rating];
        if (!rating) {
          rating = ratingsObj['todo'];
        }

        rating.media.push(datum);
      }

      const res: GroupMedium[] = [];
      for (const rating of RATINGS) {
        const tmp = ratingsObj[rating.value];
        res.push(tmp);
      }

      return res;
    });
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable.subscribe(() => {
      if (Global.isEmpty(this.groupMedia())) {
        return;
      }

      for (const category of this.groupMedia()) {
        const newLimit = this.getLimitByScreenSize();
        if (newLimit < category.limit) { // Do not decrease limit when screen is resized
          continue;
        }

        category.limit = newLimit;
      }
    });
  }
}

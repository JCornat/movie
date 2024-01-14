import { computed, Directive, inject, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { ScreenService } from '@shared/screen/screen.service';
import { Game, GroupMediaLimit, GroupMediaSort, GroupMedium, ImportMedia, MediaType, Medium, Movie, OrderBy } from '@app/interface';
import { Global } from '@shared/global/global';
import { RATINGS } from '@app/media/rating';
import { lastValueFrom, Subscription } from 'rxjs';
import { CrudService } from '@shared/crud/crud.service';
import { SERVER_URL } from '@shared/config/config';
import { Request } from '@shared/request/request';

@Directive()
export abstract class MediaService<T> extends CrudService<Medium> implements OnDestroy {
  screenService = inject(ScreenService);

  searchTerm: WritableSignal<string> = signal('');
  groupMedia: Signal<GroupMedium[]> = this.computeGroupMedia();
  groupMediaLimit: WritableSignal<GroupMediaLimit> = signal({});
  groupMediaSort: WritableSignal<GroupMediaSort> = signal({});
  abstract type: MediaType;

  resizeSubscriber!: Subscription;

  constructor() {
    super();

    this.updateGroupMediaLimit();
    this.initializeGroupMediaSort();
    this.subscribeScreenResize();
  }

  ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  /*-----------------------*\
            HTTP
  \*-----------------------*/

  async pullAll(): Promise<void> {
    const optionsQuery: Request = {
      url: `/api/${this.type}`,
      header: {
        disableAuthentication: true,
      },
      process: this.processPullAll.bind(this),
    };

    await this._pullAll(optionsQuery);
  }

  async pullOne(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/${this.type}/${id}`,
      process: this.processPullOne.bind(this),
    };

    await this._pullOne(optionsQuery);
  }

  async search(title: string): Promise<ImportMedia[]> {
    const optionsQuery = {
      url: `/api/${this.type}?search=${title}`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  async importOne(id: string): Promise<ImportMedia> {
    const optionsQuery = {
      url: `/api/${this.type}/${id}/import`,
    };

    const data: any = await lastValueFrom(this.requestService.get(optionsQuery));
    return data.data;
  }

  async update(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/${this.type}/${options.id}`,
      body: {
        ...options,
      },
    };

    await this._update(optionsQuery);
  }

  async add(options: { [key: string]: any }): Promise<void> {
    const optionsQuery = {
      url: `/api/${this.type}`,
      body: {
        ...options,
      },
    };

    await this._add(optionsQuery);
  }

  async delete(id: string): Promise<void> {
    const optionsQuery = {
      url: `/api/${this.type}/${id}`,
    };

    await this._delete(optionsQuery);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  increaseLimit(groupMedium: GroupMedium): void {
    this.groupMediaLimit.update((value) => {
      value[groupMedium.value] += this.getLimitByScreenSize();
      return { ...value };
    });
  }

  sort(item: GroupMedium, type: OrderBy): void {
    this.groupMediaSort.update((value) => {
      value[item.value] = type;
      return { ...value };
    });
  }

  shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  updateGroupMediaLimit() {
    const res: GroupMediaLimit = { ...this.groupMediaLimit() };
    const newLimit = this.getLimitByScreenSize();
    for (const rating of RATINGS) {
      const oldLimit = res[rating.value] || 0;
      if (oldLimit > newLimit) {
        continue;
      }

      res[rating.value] = newLimit;
    }

    this.groupMediaLimit.set(res);
  }

  initializeGroupMediaSort() {
    const res: GroupMediaSort = {};
    for (const rating of RATINGS) {
      res[rating.value] = OrderBy.random;
    }

    this.groupMediaSort.set(res);
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
           Compute
  \*-----------------------*/

  computeGroupMedia(): Signal<GroupMedium[]> {
    return computed(() => {
      const ratingsObj: Record<string, GroupMedium> = {};
      for (const rating of RATINGS) {
        const groupMedium: GroupMedium = {
          label: rating.label,
          value: rating.value,
          media: [],
        };

        ratingsObj[rating.value] = groupMedium;
      }

      for (const datum of this.valuesPullAll()!) {
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
        const sort = this.groupMediaSort()[rating.value];
        switch (sort) {
          case OrderBy.alphabetic:
            tmp.media = Global.sort({ data: tmp.media, key: 'title' });
            break;
          case OrderBy.alphabeticReverse:
            tmp.media = Global.sort({ data: tmp.media, key: 'title', descending: true });
            break;
          case OrderBy.mostRecent:
            tmp.media = Global.sort({ data: tmp.media, key: 'year', descending: true });
            break;
          case OrderBy.leastRecent:
            tmp.media = Global.sort({ data: tmp.media, key: 'year' });
            break;
          case OrderBy.random:
            const shuffled = Global.clone(tmp.media);
            this.shuffle(shuffled);
            tmp.media = shuffled;
            break;
          case OrderBy.lastAdded:
            tmp.media = tmp.media.reverse();
            break;
          default:
            console.log('NOT SUPPORTED SORT', sort);
            break;
        }

        res.push(tmp);
      }

      return res;
    });
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeScreenResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable
      .subscribe(() => {
        this.updateGroupMediaLimit();
      });
  }

  /*-----------------------*\
          Process
  \*-----------------------*/

  processPullAll(data: { data: Medium[] }): Medium[] {
    for (const datum of data.data) {
      datum.url = `${SERVER_URL}/upload/${datum.id}.jpg`;
      datum.urlWebp = `${SERVER_URL}/upload/${datum.id}.webp`;
    }

    return data.data;
  }

  processPullOne(data: { data: Medium }): Medium {
    const tmp = this.processPullAll({ data: [data.data] });
    return tmp[0];
  }
}

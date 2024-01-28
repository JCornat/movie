import { computed, Directive, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ScreenService } from '@shared/screen/screen.service';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, ImportMedia, MediaType, Medium, OrderBy } from '@app/interface';
import { Global } from '@shared/global/global';
import { RATINGS } from '@app/media/rating';
import { lastValueFrom, Subject, Subscription } from 'rxjs';
import { CrudService } from '@shared/crud/crud.service';
import { SERVER_URL } from '@shared/config/config';
import { Request } from '@shared/request/request';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Directive()
export abstract class MediaService<T> extends CrudService<Medium> {
  screenService = inject(ScreenService);

  abstract type: MediaType;

  #searchTerm = signal<string>('');
  searchTerm = this.#searchTerm.asReadonly();

  #groupMediaOriginal = this.#computeGroupMedia();

  #groupMedia = signal<GroupMedium[]>([]);
  groupMedia = this.#groupMedia.asReadonly();

  #groupMediaLimit = signal<GroupMediaLimit>({});
  groupMediaLimit = this.#groupMediaLimit.asReadonly();

  #groupMediaSort = this.#initializeGroupMediaSort();
  groupMediaSort = this.#groupMediaSort.asReadonly();

  #localUpdate = new Subject<Medium>();
  #localAdd = new Subject<Medium>();
  #localRemove = new Subject<string>();

  constructor() {
    super();

    this.#subscribeGroupMediaOriginal();
    this.#subscribeLocalAdd();
    this.#subscribeLocalRemove();
    this.#subscribeLocalUpdate();
    this.#subscribeScreenResize();
    this.#updateGroupMediaLimit();
  }

  /*-----------------------*\
            HTTP
  \*-----------------------*/

  override async pullAll(): Promise<void> {
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

  #subscribeGroupMediaOriginal(): Subscription {
    return toObservable(this.#groupMediaOriginal)
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.#groupMedia.set(value);
      });
  }

  // Update locally the list of media without calling the API
  pushLocalAdd(value: Medium): void {
    this.#localAdd.next(value);
  }

  // Update locally the list of media without calling the API
  #subscribeLocalAdd(): Subscription {
    return this.#localAdd
      .pipe(takeUntilDestroyed())
      .subscribe((medium: Medium) => {
        this.#groupMedia.update((value) => {
          const groupMedia = Global.clone(value);
          const groupMedium = groupMedia.find((groupMedium: GroupMedium) => groupMedium.value === medium.rating);
          if (!groupMedium) {
            throw new Error(`CATEGORY ${medium.rating} NOT FOUND`);
          }

          groupMedium.media.unshift(medium);
          return groupMedia;
        });
      });
  }

  // Update locally the list of media without calling the API
  pushLocalRemove(id: string): void {
    this.#localRemove.next(id);
  }

  // Update locally the list of media without calling the API
  #subscribeLocalRemove(): Subscription {
    return this.#localRemove
      .pipe(takeUntilDestroyed())
      .subscribe((id: string) => {
        this.#groupMedia.update((value) => {
          const groupMedia = Global.clone(value);
          for (const groupMedium of groupMedia) {
            const foundMedia = groupMedium.media.find((media: Medium) => media.id === id);
            if (!foundMedia) {
              continue;
            }

            const index = groupMedium.media.indexOf(foundMedia);
            groupMedium.media.splice(index, 1);
          }

          return groupMedia;
        });
      });
  }

  // Update locally the list of media without calling the API
  pushLocalUpdate(value: Medium): void {
    this.#localUpdate.next(value);
  }

  // Update locally the list of media without calling the API
  #subscribeLocalUpdate(): Subscription {
    return this.#localUpdate
      .pipe(takeUntilDestroyed())
      .subscribe((medium: Medium) => {
        this.#groupMedia.update((value) => {
          const groupMedia = Global.clone(value);
          for (const groupMedium of groupMedia) {
            const foundMedia = groupMedium.media.find((media: Medium) => media.id === medium.id);
            if (!foundMedia) {
              continue;
            }

            const index = groupMedium.media.indexOf(foundMedia);
            groupMedium.media.splice(index, 1);

            const newCategory = groupMedia.find((category: GroupMedium) => category.value === medium.rating);
            if (!newCategory) {
              break;
            }

            newCategory.media.unshift(medium);
            break;
          }

          return groupMedia;
        });
      });
  }

  updateSearchTerm(term: string): void {
    this.#searchTerm.set(term);
  }

  increaseLimit(groupMedium: GroupMedium): void {
    this.#groupMediaLimit.update((value) => {
      value[groupMedium.value] += this.getLimitByScreenSize();
      return Global.clone(value);
    });
  }

  sort(item: GroupMedium, type: OrderBy): void {
    this.#groupMediaSort.update((value) => {
      value[item.value] = type;
      return Global.clone(value);
    });
  }

  shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  #updateGroupMediaLimit() {
    const res: GroupMediaLimit = Global.clone(this.groupMediaLimit());
    const newLimit = this.getLimitByScreenSize();
    for (const rating of RATINGS) {
      const oldLimit = res[rating.value] || 0;
      if (oldLimit > newLimit) {
        continue;
      }

      res[rating.value] = newLimit;
    }

    this.#groupMediaLimit.set(res);
  }

  #initializeGroupMediaSort(): WritableSignal<GroupMediaSort> {
    const res: GroupMediaSort = {};
    for (const rating of RATINGS) {
      res[rating.value] = OrderBy.random;
    }

    return signal(res);
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

  #computeGroupMedia(): Signal<GroupMedium[]> {
    return computed(() => {
      const emptyRatingsRecord = this.#buildRatingRecord();
      const ratingRecord = this.#populateRatingRecord(emptyRatingsRecord);
      return this.#sortRatingRecord(ratingRecord);
    });
  }

  #buildRatingRecord() {
    const ratingRecord: Record<string, GroupMedium> = {};
    for (const rating of RATINGS) {
      const groupMedium: GroupMedium = {
        label: rating.label,
        value: rating.value,
        media: [],
      };

      ratingRecord[rating.value] = groupMedium;
    }

    return ratingRecord;
  }

  #populateRatingRecord(data: Record<string, GroupMedium>) {
    const ratingRecord = Global.clone(data);
    for (const datum of this.valuesPullAll()!) {
      const search = this.searchTerm();
      if (search) {
        if (!(datum.year + '').includes(search) && !(datum.title.toLowerCase()).includes(search.toLowerCase())) {
          continue;
        }
      }

      let rating = ratingRecord[datum.rating];
      if (!rating) {
        rating = ratingRecord['todo'];
      }

      rating.media.push(datum);
    }

    return ratingRecord;
  }

  #sortRatingRecord(data: Record<string, GroupMedium>) {
    const res: GroupMedium[] = [];
    for (const rating of RATINGS) {
      const tmp = data[rating.value];
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
  }

  /*-----------------------*\
            Subscriber
    \*-----------------------*/

  #subscribeScreenResize(): Subscription {
    return this.screenService.widthResizeObservable
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#updateGroupMediaLimit();
      });
  }

  /*-----------------------*\
          Process
  \*-----------------------*/

  processPullAll(data: { data: Medium[] }): Medium[] {
    for (const datum of data.data) {
      datum.url = `${SERVER_URL}/image/${datum.id}.jpg`;
      datum.urlWebp = `${SERVER_URL}/image/${datum.id}.webp`;
    }

    return data.data;
  }

  processPullOne(data: { data: Medium }): Medium {
    const tmp = this.processPullAll({ data: [data.data] });
    return tmp[0];
  }
}

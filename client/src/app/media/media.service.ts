import { computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MediumApiService } from '@shared/api-services/medium/medium-api.service';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, ImportMedia, Medium, OrderBy } from '@app/interface';
import { ScreenService } from '@shared/screen/screen.service';
import { Global } from '@shared/global/global';
import { RATINGS } from '@app/media/rating';
import { HttpErrorResponse } from '@angular/common/http';
import { defer, finalize, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class MediaService<T extends Medium> {
  readonly screenService = inject(ScreenService);
  readonly groupMedia = this.#computeGroupMedia();
  //#endregion
  //#region Injection
  protected abstract readonly apiService: MediumApiService<T>;
  //#region Props
  protected readonly statePullAll = signal<{ values: T[] | null, hasMore: boolean | null, error: string | null, loading: boolean }>({
    values: [] as T[],
    hasMore: null,
    error: null,
    loading: false,
  });
  readonly valuesPullAll = computed(() => this.statePullAll().values);
  readonly hasMorePullAll = computed(() => this.statePullAll().hasMore);
  readonly errorPullAll = computed(() => this.statePullAll().error);
  readonly loadingPullAll = computed(() => this.statePullAll().loading);
  protected readonly statePullOne = signal<{ values: T | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });
  readonly valuesPullOne = computed(() => this.statePullOne().values);
  readonly errorPullOne = computed(() => this.statePullOne().error);
  readonly loadingPullOne = computed(() => this.statePullOne().loading);
  protected readonly stateAdd = signal<{ values: any, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });
  readonly valuesAdd = computed(() => this.stateAdd().values);
  readonly errorAdd = computed(() => this.stateAdd().error);
  readonly loadingAdd = computed(() => this.stateAdd().loading);
  protected readonly stateUpdate = signal<{ values: T | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });
  readonly valuesUpdate = computed(() => this.stateUpdate().values);
  readonly errorUpdate = computed(() => this.stateUpdate().error);
  readonly loadingUpdate = computed(() => this.stateUpdate().loading);
  protected readonly stateDelete = signal<{ values: number | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });
  readonly valuesDelete = computed(() => this.stateDelete().values);
  readonly errorDelete = computed(() => this.stateDelete().error);
  readonly loadingDelete = computed(() => this.stateDelete().loading);
  readonly #searchTerm = signal<string>('');
  readonly searchTerm = this.#searchTerm.asReadonly();
  readonly #groupMediaLimit = signal<GroupMediaLimit>({});
  readonly groupMediaLimit = this.#groupMediaLimit.asReadonly();

  readonly #groupMediaSort = this.#initializeGroupMediaSort();
  groupMediaSort = this.#groupMediaSort.asReadonly();

  //#endregion

  constructor() {
    this.#updateGroupMediaLimit();
  }

  //#region Methods

  pullAll(): Observable<T[]> {
    return defer(() => {
      this.#startLoading(this.statePullAll);
      return of(null);
    }).pipe(
      switchMap(() => this.apiService.pullAll()),
      tap((result) => {
        this.statePullAll.update((state) => ({
          ...state,
          values: result,
          error: null,
        }));
      }),
      catchError((err) => {
        this.statePullAll.update((state) => ({
          ...state,
          values: [],
          error: err.error,
        }));
        return of([]);
      }),
      finalize((() => {
        this.#stopLoading(this.statePullAll);
      })),
    );
  }

  pullOne(id: string): Observable<T | null> {
    return defer(() => {
      this.#startLoading(this.statePullOne);
      return of(null);
    }).pipe(
      switchMap(() => this.apiService.pullOne(id)),
      tap((values) => {
        this.statePullOne.update((state) => ({
          ...state,
          error: null,
          values,
        }));
      }),
      catchError((err: HttpErrorResponse) => {
        this.statePullOne.update((state) => ({
          ...state,
          error: err.error,
          values: null,
        }));
        return of(null);
      }),
      finalize(() => {
        this.#stopLoading(this.statePullOne);
      }),
    );
  }

  add(value: Partial<T>): Observable<void> {
    return defer(() => {
      this.#startLoading(this.stateAdd);
      return of(null);
    }).pipe(
      switchMap(() => this.apiService.add(value)),
      catchError((err: HttpErrorResponse) => {
        this.stateAdd.update((state) => ({
          ...state,
          error: err.error,
          values: null,
          loading: false,
        }));
        return throwError(() => err);
      }),
      tap(() => this.#stopLoading(this.stateAdd)),
    );
  }

  update(value: Partial<T> & { id: string }): Observable<void> {
    return defer(() => {
      this.#startLoading(this.stateUpdate);
      return of(null);
    }).pipe(
      switchMap(() => this.apiService.updateOne(value)),
      catchError((err: HttpErrorResponse) => {
        this.stateUpdate.update((state) => ({
          ...state,
          error: err.error,
          values: null,
          loading: false,
        }));
        return throwError(() => err);
      }),
      tap(() => this.#stopLoading(this.stateUpdate)),
    );
  }

  delete(id: string): Observable<void> {
    return defer(() => {
      this.#startLoading(this.stateDelete);
      return of(null);
    }).pipe(
      switchMap(() => this.apiService.delete(id)),
      catchError((err: HttpErrorResponse) => {
        this.stateDelete.update((state) => ({
          ...state,
          error: err.error,
        }));
        return throwError(() => err);
      }),
      tap(() => this.#stopLoading(this.stateDelete)),
    );
  }

  importOne(id: string): Observable<ImportMedia> {
    return this.apiService.importOne(id);
  }

  search(title: string): Observable<ImportMedia[]> {
    return this.apiService.search(title);
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

  #startLoading<T extends { loading: boolean, error: any }>(state: WritableSignal<T>): void {
    state.update((s: T) => ({
      ...s,
      loading: true,
      error: null,
    }));
  }

  #stopLoading<T extends { loading: boolean, error: any }>(state: WritableSignal<T>): void {
    state.update((s) => ({
      ...s,
      loading: false,
    }));
  }
  //#endregion

  //#region Computed
  #computeGroupMedia(): Signal<GroupMedium[]> {
    return computed(() => {
      const emptyRatingsRecord = this.#buildRatingRecord();
      const data: T[] | null = this.valuesPullAll();
      const search: string = this.searchTerm();
      const ratingRecord = this.#populateRatingRecord(emptyRatingsRecord, data ?? [], search);
      return this.#sortRatingRecord(ratingRecord);
    });
  }

  #buildRatingRecord() {
    const ratingRecord: Record<string, GroupMedium> = {};
    for (const rating of RATINGS) {
      ratingRecord[rating.value] = {
        label: rating.label,
        value: rating.value,
        media: [],
      };
    }

    return ratingRecord;
  }

  #populateRatingRecord(record: Record<string, GroupMedium>, data: T[], search: string) {
    const ratingRecord = Global.clone(record);
    for (const datum of data) {
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
          console.error('NOT SUPPORTED SORT', sort);
          break;
      }

      res.push(tmp);
    }

    return res;
  }
  //#endregion
}

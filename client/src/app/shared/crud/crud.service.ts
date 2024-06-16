import { computed, inject, signal } from '@angular/core';

import { Request } from '@shared/request/request';
import { RequestService, RequestType } from '@shared/request/request.service';

export abstract class CrudService<T> {
  requestService = inject(RequestService);

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

  async _pullAll(optionsQuery: Request): Promise<void> {
    const requestBuilderOptions = {
      state: this.statePullAll,
      method: RequestType.GET,
      request: optionsQuery,
      process: optionsQuery.process,
    };

    await this.requestService.builder(requestBuilderOptions);
  }

  async _pullOne(optionsQuery: Request): Promise<void> {
    const requestBuilderOptions = {
      state: this.statePullOne,
      method: RequestType.GET,
      request: optionsQuery,
      process: optionsQuery.process,
    };

    await this.requestService.builder(requestBuilderOptions);
  }

  _add(optionsQuery: Request): Promise<void> {
    const requestBuilderOptions = {
      state: this.stateAdd,
      method: RequestType.POST,
      request: optionsQuery,
      process: optionsQuery.process,
    };

    return this.requestService.builder(requestBuilderOptions);
  }

  _update(optionsQuery: Request): Promise<void> {
    const requestBuilderOptions = {
      state: this.stateUpdate,
      method: RequestType.PUT,
      request: optionsQuery,
      process: optionsQuery.process,
    };

    return this.requestService.builder(requestBuilderOptions);
  }

  _delete(optionsQuery: Request): Promise<void> {
    const requestBuilderOptions = {
      state: this.stateDelete,
      method: RequestType.DELETE,
      request: optionsQuery,
      process: optionsQuery.process,
    };

    return this.requestService.builder(requestBuilderOptions);
  }
}

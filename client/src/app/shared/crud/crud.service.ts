import { computed, inject, signal } from '@angular/core';

import { Request } from '@shared/request/request';
import { RequestService, RequestType } from '@shared/request/request.service';

export abstract class CrudService<T> {
  requestService = inject(RequestService);

  protected statePullAll = signal<{ values: T[] | null, hasMore: boolean | null, error: string | null, loading: boolean }>({
    values: [] as T[],
    hasMore: null,
    error: null,
    loading: false,
  });

  valuesPullAll = computed(() => this.statePullAll().values);
  hasMorePullAll = computed(() => this.statePullAll().hasMore);
  errorPullAll = computed(() => this.statePullAll().error);
  loadingPullAll = computed(() => this.statePullAll().loading);

  protected statePullOne = signal<{ values: T | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });

  valuesPullOne = computed(() => this.statePullOne().values);
  errorPullOne = computed(() => this.statePullOne().error);
  loadingPullOne = computed(() => this.statePullOne().loading);

  protected stateAdd = signal<{ values: any, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });

  valuesAdd = computed(() => this.stateAdd().values);
  errorAdd = computed(() => this.stateAdd().error);
  loadingAdd = computed(() => this.stateAdd().loading);

  protected stateUpdate = signal<{ values: T | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });

  valuesUpdate = computed(() => this.stateUpdate().values);
  errorUpdate = computed(() => this.stateUpdate().error);
  loadingUpdate = computed(() => this.stateUpdate().loading);

  protected stateDelete = signal<{ values: number | null, error: string | null, loading: boolean }>({
    values: null,
    error: null,
    loading: false,
  });

  valuesDelete = computed(() => this.stateDelete().values);
  errorDelete = computed(() => this.stateDelete().error);
  loadingDelete = computed(() => this.stateDelete().loading);

  abstract pullAll(options?: any): void;

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

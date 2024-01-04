import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { removeAllEntities, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

import { MovieInterface } from '../../models/movie/movie.interface';
import { MovieService } from '../../services/movie/movie.service';

// eslint-disable-next-line @typescript-eslint/typedef
export const MovieStore = signalStore(
  { providedIn: 'root' },
  withState({ search: '', limit: 20, isLoading: false }),
  withEntities<MovieInterface>(),
  withMethods((store) => {
    const apiService: MovieService = inject(MovieService);
    return {
      load: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((search: string) =>
            apiService.getAll(search).pipe(
              tapResponse({
                next: (movies) => {
                  patchState(store, setEntities(movies));
                },
                error: () => {
                  patchState(store, removeAllEntities());
                },
                finalize: () => {
                  patchState(store, { isLoading: false });
                },
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => ({
    totals: computed(() => store.entities().length),
  })),
  withHooks({
    // eslint-disable-next-line @typescript-eslint/typedef
    onInit(store) {
      store.load(store.search());
      console.log(store);
    },
  }),
);

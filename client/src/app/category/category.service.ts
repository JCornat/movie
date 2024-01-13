import { computed, inject, Injectable, Signal } from '@angular/core';
import { Global } from '@shared/global/global';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, Observable } from 'rxjs';
import { HeaderLink, MediaType } from '@app/interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  router = inject(Router);

  currentCategory = this.computeCurrentCategory();
  categories = this.computeCategories();

  computeCategories(): Signal<HeaderLink[]> {
    return computed(() => {
      const type = this.currentCategory();

      return [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movie', active: (type === 'movie') },
        { label: 'Series', path: '/serie', active: (type === 'serie') },
        { label: 'Games', path: '/game', active: (type === 'game') },
      ];
    });
  }

  computeCurrentCategory(): Signal<MediaType> {
    const route$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) as Observable<NavigationEnd>;

    const route = toSignal(route$);
    return computed(() => {
      const regex = /^\/(\w+)/;
      const url = route()?.url || '';
      const regexResult = regex.exec(url);
      const type = regexResult?.[1];
      if (Global.isEmpty(type)) {
        throw { status: 400, method: 'MediaComponent.buildType', message: `Type unknown` };
      }

      return type as MediaType;
    });
  }
}

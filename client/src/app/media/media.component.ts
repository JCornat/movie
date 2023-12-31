import { computed, Directive, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { RATINGS } from '@app/media/rating';
import { ScreenService } from '@shared/screen/screen.service';
import { SerieService } from '@app/serie/serie.service';
import * as Global from '@shared/global/global';
import { CategoryService } from '@app/category/category.service';
import { Category, Media } from '@app/interface';

@Directive()
export abstract class MediaComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  screenService = inject(ScreenService);
  abstract mediaService: SerieService | MovieService | GameService;

  resizeSubscriber!: Subscription;
  media!: Media[];
  displayList = this.computeDisplayList();
  categories: WritableSignal<Category[]> = signal([]);
  isLogged = this.computeIsLogged();

  ngOnInit(): void {
    this.subscribeResize();
    this.pullAll();
  }

  ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  increaseLimit(item: Category): void {
    const newLimit = this.getLimitByScreenSize();
    item.limit += newLimit * 4;
  }

  sort(item: Category, type: string): void {
    item.orderBy = type;

    if (type === 'random') {
      this.shuffle(item.media);
      return;
    }

    const key = (type === 'alphabetic') ? 'title' : 'year';
    item.media = Global.sort({ data: item.media, key });
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateUpdate(media: Media): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.categoryService.currentCategory()}`, media.id, 'update']);
  }

  navigateSearch(): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.categoryService.currentCategory()}`, 'search']);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async pullAll(): Promise<void> {
    this.media = await this.mediaService.pullAll();
    this.shuffle(this.media);

    const categories = this.processCategories(this.media);
    this.categories.set(categories);
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  processCategories(data: Media[], search?: string): Category[] {
    const limit = this.getLimitByScreenSize();

    const ratingsObj: { [key: string | number]: { label: string, value: string | number, limit: number, orderBy: string, media: Media[] } } = {};
    for (const rating of RATINGS) {
      const tmp = {
        label: rating.label,
        value: rating.value,
        limit,
        orderBy: 'random',
        media: [],
      };

      ratingsObj[rating.value] = tmp;
    }

    for (const datum of data) {
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

    const res = [];
    for (const rating of RATINGS) {
      const tmp = ratingsObj[rating.value];
      res.push(tmp);
    }

    return res;
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable.subscribe(() => {
      if (Global.isEmpty(this.categories())) {
        return;
      }

      for (const category of this.categories()) {
        const newLimit = this.getLimitByScreenSize();
        if (newLimit < category.limit) { // Do not decrease limit when screen is resized
          continue;
        }

        category.limit = newLimit;
      }
    });
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

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
          Compute
  \*-----------------------*/

  computeIsLogged(): Signal<boolean> {
    return computed(() => {
      return this.authenticationService.isLogged();
    });
  }

  computeDisplayList(): Signal<Category[]> {
    return computed(() => {
      const search = '';
      if (search) {
        return this.processCategories(this.media, search);
      }

      return this.categories();
    });
  }
}

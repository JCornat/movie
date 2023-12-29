import { computed, Directive, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Category } from '@app/media/category';
import { GameService } from '@app/game/game.service';
import { Media } from '@app/media/media';
import { MovieService } from '@app/movie/movie.service';
import { RATINGS } from '@app/media/rating';
import { ScreenService } from '@shared/screen/screen.service';
import { SerieService } from '@app/serie/serie.service';
import * as Global from '@shared/global/global';
import { MediaType } from '@app/media/media-type';
import { HeaderLink } from '@app/media/header-link';

@Directive()
export abstract class MediaComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  screenService = inject(ScreenService);
  abstract mediaService: SerieService | MovieService | GameService;

  resizeSubscriber!: Subscription;
  media!: Media[];
  searchForm!: FormGroup;
  formData: WritableSignal<Record<string, any>> = signal({});
  displayList = this.computeDisplayList();
  categories: WritableSignal<Category[]> = signal([]);
  type = this.computeType();
  links = this.computeLinks();
  isLogged = this.computeIsLogged();

  ngOnInit(): void {
    this.buildForm();
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

    this.router.navigate([`/${this.type}`, media.id, 'update']);
  }

  navigateSearch(): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.type}`, 'search']);
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

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }

  buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }

  /*-----------------------*\
          Compute
  \*-----------------------*/

  computeLinks(): Signal<HeaderLink[]> {
    return computed(() => {
      const type = this.type();

      return [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movie', active: (type === 'movie') },
        { label: 'Series', path: '/serie', active: (type === 'serie') },
        { label: 'Games', path: '/game', active: (type === 'game') },
      ];
    });
  }

  computeType(): Signal<MediaType> {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1];
    if (Global.isEmpty(type)) {
      throw { status: 400, method: 'MediaComponent.buildType', message: `Type unknown` };
    }

    return signal(type as MediaType);
  }

  computeIsLogged(): Signal<boolean> {
    return computed(() => {
      return this.authenticationService.isLogged();
    });
  }

  computeDisplayList(): Signal<Category[]> {
    return computed(() => {
      const search = this.formData().search;
      if (search) {
        return this.processCategories(this.media, search);
      }

      return this.categories();
    });
  }
}

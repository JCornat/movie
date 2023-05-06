import { computed, Directive, effect, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import * as Global from '@shared/global/global';
import { ScreenService } from '@shared/screen/screen.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '@app/media/category';
import { Media } from '@app/media/media';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import { RATINGS } from '@app/media/rating';

@Directive()
export abstract class MediaComponent implements OnInit, OnDestroy {
  public displayList!: Category[];
  public categories!: Category[];
  public searchCategories!: Category[];
  public resizeSubscriber!: Subscription;
  public formData!: { [key: string]: any };
  public media!: Media[];
  public searchForm!: FormGroup;
  public links!: any[];
  public type!: 'movie' | 'serie' | 'game';

  public isLogged: Signal<boolean> = computed(() => {
    return this.authenticationService.isLogged();
  });

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public screenService: ScreenService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.buildType();
    this.buildLinks();
    this.buildForm();
    this.subscribeResize();
    this.pullAll();
  }

  public ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public increaseLimit(item: Category): void {
    const newLimit = this.getLimitByScreenSize();
    item.limit += newLimit * 4;
  }

  public sort(item: Category, type: string): void {
    item.orderBy = type;

    if (type === 'random') {
      this.shuffle(item.media);
      return;
    }

    const key = (type === 'alphabetic') ? 'title' : 'year';
    item.media = Global.sort({data: item.media, key});
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigate(path: string): void {
    this.router.navigate([path]);
  }

  public navigateUpdate(media: Media): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.type}`, media.id, 'update']);
  }

  public navigateSearch(): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.type}`, 'search']);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract pullAll(): Promise<void>;

  /*-----------------------*\
           Process
  \*-----------------------*/

  public processDisplayList(): void {
    this.displayList = (this.formData?.search) ? this.searchCategories : this.categories;
  }

  public processCategories(data: Media[], search?: string): Category[] {
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
      this.shuffle(tmp.media);

      res.push(tmp);
    }

    return res;
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  public subscribeResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable.subscribe(() => {
      if (Global.isEmpty(this.categories)) {
        return;
      }

      for (const category of this.categories) {
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

  public shuffle(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public getLimitByScreenSize(): number {
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

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
    this.searchCategories = this.processCategories(this.media, data.search);
    this.processDisplayList();
  }

  public buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }

  public buildLinks(): void {
    this.links = [
      {label: 'Home', path: '/'},
      {label: 'Movies', path: '/movie', active: this.type === 'movie'},
      {label: 'Series', path: '/serie', active: this.type === 'serie'},
      {label: 'Games', path: '/game', active: this.type === 'game'},
    ];
  }

  public buildType(): void {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1];
    if (Global.isEmpty(type)) {
      throw {status: 400, method: 'MediaComponent.buildType', message: `Type unknown`};
    }

    this.type = type as 'movie' | 'serie' | 'game';
  }
}

import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '@shared/global/global';
import { ScreenService } from '@shared/screen/screen.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from '@app/game/game';
import { Movie } from '@app/movie/movie';
import { Serie } from '@app/serie/serie';
import { Category } from "@app/media/category";
import { Media } from "@app/media/media";
// import { AuthenticationService } from '../authentication/authentication.service';

@Directive()
export abstract class MediaComponent implements OnInit, OnDestroy {
  public displayList!: Category[];
  public categories!: Category[];
  public searchCategories!: Category[];
  public resizeSubscriber!: Subscription;
  public formData!: { [key: string]: any };
  public media!: Media[];
  public isLogged!: boolean;
  public profileForm!: FormGroup;
  public links!: any[];

  constructor(
    // public authenticationService: AuthenticationService,
    public router: Router,
    public screenService: ScreenService,
  ) {
    //
  }

  public ngOnInit(): void {
    // this.isLogged = this.authenticationService.isLogged();
    this.subscribeResize();
    this.pullAll();

    const url = this.router.url;
    this.links = [
      {label: 'Home', path: '/'},
      {label: 'Movies', path: '/movie', active: url.startsWith('/movie')},
      {label: 'Series', path: '/serie', active: url.startsWith('/serie')},
      {label: 'Games', path: '/game', active: url.startsWith('/game')},
    ]

    this.profileForm = new FormGroup({
      search: new FormControl(''),
    });

    this.profileForm.valueChanges.subscribe((data) => {
      this.onValid(data)
    });
  }

  public ngOnDestroy(): void {
    this.resizeSubscriber.unsubscribe();
  }

  public abstract pullAll(): Promise<void>;

  public processDisplayList(): void {
    this.displayList = (this.formData?.search) ? this.searchCategories : this.categories;
  }

  public processCategories(data: (Game | Movie | Serie)[], search?: string): Category[] {
    const limit = this.getLimitByScreenSize();
    const favourites: Category = {label: 'Favourites', limit, orderBy: 'random', media: []};
    const exceptional: Category = {label: 'Excellents', limit, orderBy: 'random', media: []};
    const good: Category = {label: 'Goods', limit, orderBy: 'random', media: []};
    const mediocre: Category = {label: 'Mediocres', limit, orderBy: 'random', media: []};
    const bad: Category = {label: 'Bads', limit, orderBy: 'random', media: []};
    const todo: Category = {label: 'Todos', limit, orderBy: 'random', media: []};

    for (const datum of data) {
      if (search) {
        if (!(datum.year + '').includes(search) && !(datum.title.toLowerCase()).includes(search.toLowerCase())) {
          continue;
        }
      }

      if (!datum.rating) {
        todo.media.push(datum);
      } else if (datum.rating >= 5) {
        favourites.media.push(datum);
      } else if (datum.rating >= 4) {
        exceptional.media.push(datum);
      } else if (datum.rating >= 3) {
        good.media.push(datum);
      } else if (datum.rating >= 2) {
        mediocre.media.push(datum);
      } else if (datum.rating >= 0) {
        bad.media.push(datum);
      } else {
        console.error('rating not supported', datum);
      }
    }

    this.shuffle(favourites.media);
    this.shuffle(exceptional.media);
    this.shuffle(good.media);
    this.shuffle(mediocre.media);
    this.shuffle(bad.media);
    this.shuffle(todo.media);

    return [
      favourites,
      exceptional,
      good,
      mediocre,
      bad,
      todo,
    ];
  }

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

  public increaseLimit(item: Category): void {
    item.limit += 25;
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

  public subscribeResize(): void {
    this.resizeSubscriber = this.screenService.widthResizeObservable.subscribe(() => {
      if (Global.isEmpty(this.categories)) {
        return;
      }

      for (const category of this.categories) {
        category.limit = this.getLimitByScreenSize();
      }
    });
  }

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
    this.searchCategories = this.processCategories(this.media, data.search);
    this.processDisplayList();
  }

  public navigate(path: string): void {
    this.router.navigate([path]);
  }

  public abstract navigateUpdate(media: Media): void;
}

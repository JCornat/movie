import { computed, Directive, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import { CategoryService } from '@app/category/category.service';
import { GroupMedium, Media } from '@app/interface';

@Directive()
export abstract class MediaComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  abstract mediaService: SerieService | MovieService | GameService;

  media!: Media[];
  isLogged = this.authenticationService.isLogged;
  displayList = this.computeDisplayList();

  ngOnInit(): void {
    this.mediaService.pullAll();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  search(term: string): void {
    this.mediaService.updateSearchTerm(term);
  }

  increaseLimit(groupMedium: GroupMedium): void {
    this.mediaService.increaseLimit(groupMedium);
  }

  sort(item: GroupMedium, type: string): void {
    this.mediaService.sort(item, type);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateSearch(): void {
    if (!this.isLogged()) {
      return;
    }

    this.router.navigate([`/${this.categoryService.currentCategory()}`, 'search']);
  }
  /*-----------------------*\
          Navigation
  \*-----------------------*/

  navigateUpdate(media: Media): void {
    // if (!this.isLogged()) {
    return;
    // }

    this.router.navigate([`/${this.categoryService.currentCategory()}`, media.id, 'update']);
  }

  /*-----------------------*\
          Compute
  \*-----------------------*/

  computeDisplayList(): Signal<GroupMedium[]> {
    return computed(() => {
      return this.mediaService.groupMedia();
    });
  }
}

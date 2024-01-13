import { computed, Directive, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import { CategoryService } from '@app/category/category.service';
import { GroupMedium, Medium, OrderBy } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';

@Directive()
export abstract class MediaComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  categoryService = inject(CategoryService);
  panelService = inject(PanelService);
  router = inject(Router);
  abstract mediaService: SerieService | MovieService | GameService;

  media!: Medium[];
  isLogged = this.authenticationService.isLogged;
  displayList = this.computeDisplayList();
  searchTerm = this.computeSearchTerm();
  groupMediaLimit = this.computeGroupMediaLimit();
  groupMediaSort = this.computeGroupMediaSort();

  ngOnInit(): void {
    this.mediaService.pullAll();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  abstract getSearchComponent(): any;

  abstract getAddComponent(): any;

  abstract getUpdateComponent(): any;

  search(term: string): void {
    this.mediaService.updateSearchTerm(term);
  }

  increaseLimit(groupMedium: GroupMedium): void {
    this.mediaService.increaseLimit(groupMedium);
  }

  sort(value: { groupMedium: GroupMedium, type: OrderBy }): void {
    this.mediaService.sort(value.groupMedium, value.type);
  }

  openSearchPanel(): void {
    const component = this.getSearchComponent();
    this.panelService.open({ component });
  }

  openUpdatePanel(media: Medium): void {
    const component = this.getUpdateComponent();
    this.panelService.open({ component, inputs: { id: media.id } });
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  /*-----------------------*\
          Navigation
  \*-----------------------*/

  /*-----------------------*\
          Compute
  \*-----------------------*/

  computeDisplayList(): Signal<GroupMedium[]> {
    return computed(() => {
      return this.mediaService.groupMedia();
    });
  }

  computeSearchTerm() {
    return computed(() => {
      return this.mediaService.searchTerm();
    });
  }

  computeGroupMediaLimit() {
    return computed(() => {
      return this.mediaService.groupMediaLimit();
    });
  }

  computeGroupMediaSort() {
    return computed(() => {
      return this.mediaService.groupMediaSort();
    });
  }
}

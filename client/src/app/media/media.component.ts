import { computed, Directive, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, Medium, OrderBy } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import { MediaService } from '@app/media/media.service';

@Directive()
export abstract class MediaComponent<T extends Medium> implements OnInit {
  authenticationService = inject(AuthenticationService);
  panelService = inject(PanelService);
  router = inject(Router);
  abstract mediaService: MediaService<T>;

  media!: Medium[];
  isLogged = this.authenticationService.isLogged;
  displayList = this.computeDisplayList();
  searchTerm = this.computeSearchTerm();
  groupMediaLimit = this.computeGroupMediaLimit();
  groupMediaSort = this.computeGroupMediaSort();

  ngOnInit(): void {
    this.mediaService.pullAll().subscribe();
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

  sort(value: { groupMedium: GroupMedium, type: OrderBy }): void {
    this.mediaService.sort(value.groupMedium, value.type);
  }

  openSearchPanel(): void {
    if (!this.isLogged()) {
      return;
    }

    const component = this.getSearchComponent();
    this.panelService.open({ component, inputs: { searchTerm: this.searchTerm() } });
  }

  openUpdatePanel(media: Medium): void {
    if (!this.isLogged()) {
      return;
    }

    const component = this.getUpdateComponent();
    this.panelService.open({ component, inputs: { id: media.id } });
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  abstract getSearchComponent(): any;

  abstract getUpdateComponent(): any;

  /*-----------------------*\
          Compute
  \*-----------------------*/

  computeDisplayList(): Signal<GroupMedium[]> {
    return computed(() => {
      return this.mediaService.groupMedia();
    });
  }

  computeSearchTerm(): Signal<string> {
    return computed(() => {
      return this.mediaService.searchTerm();
    });
  }

  computeGroupMediaLimit(): Signal<GroupMediaLimit> {
    return computed(() => {
      return this.mediaService.groupMediaLimit();
    });
  }

  computeGroupMediaSort(): Signal<GroupMediaSort> {
    return computed(() => {
      return this.mediaService.groupMediaSort();
    });
  }
}

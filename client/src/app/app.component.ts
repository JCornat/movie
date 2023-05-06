import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RequestService } from '@shared/request/request.service';
import { ThemeService } from '@shared/theme/theme.service';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import * as Config from '@shared/config/config';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService,
    private requestService: RequestService,
    private metaTagService: Meta,
  ) {
    //
  }

  public ngOnInit(): void {
    this.requestService.currentServer = Config.SERVER_URL;
    this.authenticationService.init();
    this.themeService.init();
    this.metaTagService.addTags(Config.META_TAGS);
  }
}

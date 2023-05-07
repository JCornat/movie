import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

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
  private authenticationService = inject(AuthenticationService);
  private themeService = inject(ThemeService);
  private requestService = inject(RequestService);
  private metaTagService = inject(Meta);

  ngOnInit(): void {
    this.requestService.currentServer = Config.SERVER_URL;
    this.themeService.init();
    this.metaTagService.addTags(Config.META_TAGS);
  }
}

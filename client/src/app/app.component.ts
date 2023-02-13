import { Component, OnInit } from '@angular/core';

import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';
import { ThemeService } from '@shared/theme/theme.service';
import { AuthenticationService } from '@shared/authentication/authentication.service';

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
  ) {
    //
  }

  public ngOnInit(): void {
    this.requestService.currentServer = SERVER_URL;
    this.authenticationService.init();
    this.themeService.init();
  }
}

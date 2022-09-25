import { Component } from '@angular/core';

import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';
import { ThemeService } from '@shared/theme/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(
    private requestService: RequestService,
    private themeService: ThemeService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.requestService.currentServer = SERVER_URL;
    this.themeService.init();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { RequestService } from '@shared/request/request.service';
import { ThemeService } from '@shared/theme/theme.service';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import * as Config from '@shared/config/config';
import { RouterModule } from '@angular/router';
import { PanelComponent } from '@app/panel/panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, PanelComponent],
  template: `
    <app-panel/>
    <router-outlet/>
  `,
})
export class AppComponent implements OnInit {
  authenticationService = inject(AuthenticationService); // Keep to fire AuthenticationService constructor
  themeService = inject(ThemeService);
  requestService = inject(RequestService);
  metaTagService = inject(Meta);

  ngOnInit(): void {
    this.requestService.currentServer = Config.SERVER_URL;
    this.themeService.init();
    this.metaTagService.addTags(Config.META_TAGS);
  }
}

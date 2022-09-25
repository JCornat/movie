import { Component } from '@angular/core';

import { RequestService } from '@shared/request/request.service';
import { SERVER_URL } from '@shared/config/config';

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
  ) {
    this.requestService.currentServer = SERVER_URL;
  }

  public ngOnInit(): void {
  }
}

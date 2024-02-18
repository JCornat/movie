import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class LogoutComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.authenticationService.logout();
    this.navigateHome();
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}

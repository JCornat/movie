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

  ngOnInit() {
    this.authenticationService.logout();
    this.navigateHome();
  }

  //region Navigation
  navigateHome(): void {
    this.router.navigate(['/']);
  }
  //endregion
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class LogoutComponent implements OnInit {
  public authenticationService = inject(AuthenticationService);
  public router = inject(Router);

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.authenticationService.logout();
    this.navigateHome();
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateHome(): void {
    this.router.navigate(['/']);
  }
}

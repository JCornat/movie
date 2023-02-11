import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TokenService } from '@shared/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public tokenService: TokenService,
  ) {
    this.init();
  }

  public init(): void {
    //
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public isLogged(): boolean {
    return !this.tokenService.hasToken();
  }
}

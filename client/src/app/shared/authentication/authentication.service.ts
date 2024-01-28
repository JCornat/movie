import { inject, Injectable } from '@angular/core';

import { TokenService } from '@shared/token/token.service';
import { Request } from '@shared/request/request';
import { CrudService } from '@shared/crud/crud.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends CrudService<any> {
  tokenService = inject(TokenService);

  isLogged = this.tokenService.hasToken;
  stayLogged = this.tokenService.stayLogged;

  constructor() {
    super();

    this.#subscribeValuesAdd();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  async login(options: { username: string, password: string, stayLogged: boolean }): Promise<void> {
    const optionsQuery: Request = {
      url: `/api/login`,
      header: {
        disableAuthentication: true,
      },
      body: {
        ...options,
      },
    };

    await this._add(optionsQuery);
  }

  override async pullAll(): Promise<void> {
    //
  }

  /*-----------------------*\
          Service
  \*-----------------------*/

  logout(): void {
    this.tokenService.reset();
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  #subscribeValuesAdd() {
    toObservable(this.valuesAdd)
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.tokenService.setToken(data.token);
        this.tokenService.setRefreshToken(data.refresh);
      });
  }
}

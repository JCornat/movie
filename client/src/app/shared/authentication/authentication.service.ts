import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TokenService } from '@shared/token/token.service';
import { RequestService } from '@shared/request/request.service';
import { Request } from '@shared/request/request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public requestService: RequestService,
    public tokenService: TokenService,
  ) {
    this.init();
  }

  public init(): void {
    this.tokenService.init();
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async login(options: { username: string, password: string, stayLogged: boolean }): Promise<void> {
    const optionsQuery: Request = {
      url: `/api/login`,
      header: {
        disableAuthentication: true,
      },
      body: {
        ...options,
      },
    };

    let data: any;

    try {
      data = await this.requestService.post(optionsQuery).toPromise();
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (options.stayLogged) {
      await this.tokenService.setStayLogged('true');
    } else {
      await this.tokenService.removeStayLogged();
    }

    await this.tokenService.setToken(data.token);
    await this.tokenService.setTemporaryToken(data.token);

    return data;
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public isLogged(): boolean {
    return this.tokenService.hasToken();
  }
}

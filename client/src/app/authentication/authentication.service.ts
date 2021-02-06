import { Injectable } from '@angular/core';

import { RequestService } from '../request/request.service';
import { Request } from '../request/request';
import { TokenService } from '../token/token.service';
import * as Global from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private requestService: RequestService,
    private tokenService: TokenService,
  ) {
    //
  }

  public async login(options: {login: string, password: string, stayLogged: boolean}): Promise<void> {
    const optionsQuery: Request = {
      url: `/api/login`,
      header: {
        disableAuthentication: true,
      },
      body: {
        login: options.login,
        password: options.password,
      }
    };

    const data: any = await this.requestService.post(optionsQuery).toPromise();
    this.tokenService.reset();

    if (options.stayLogged) {
      this.tokenService.setStayLogged('true');
    }

    this.tokenService.setToken(data.token);
    this.tokenService.setRefreshToken(data.refresh);
  }

  public isLogged(): boolean {
    return Global.isPopulated(this.tokenService.getToken());
  }
}

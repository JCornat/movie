import { Injectable } from '@angular/core';
import { MOVIE_URL } from '../config/config';
import { RequestService } from '../request/request.service';
import { Request } from '../request/request';
import { TokenService } from '../token/token.service';

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
      url: `${MOVIE_URL}/api/login`,
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
}

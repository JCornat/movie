import { computed, effect, Injectable, Injector, Signal, signal, WritableSignal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { TokenService } from '@shared/token/token.service';
import { RequestService } from '@shared/request/request.service';
import { Request } from '@shared/request/request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLogged: Signal<boolean> = signal(false);

  constructor(
    public requestService: RequestService,
    public tokenService: TokenService,
  ) {
    this.init();
  }

  public init(): void {
    this.tokenService.init();
    this.isLogged = computed(() => {
      return this.tokenService.hasToken();
    });
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

    let data: { [key: string]: any };

    try {
      data = await lastValueFrom(this.requestService.post(optionsQuery));
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (options.stayLogged) {
      this.tokenService.setStayLogged('true');
    } else {
      this.tokenService.removeStayLogged();
    }

    this.tokenService.token = data.token;
    this.tokenService.refreshToken = data.refresh;
  }
}

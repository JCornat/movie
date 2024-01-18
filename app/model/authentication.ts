import { Request } from 'express';
import { v4 as UUID } from 'uuid';

import { ADMINISTRATOR_USERNAME, ADMINISTRATOR_PASSWORD } from '@config/config';
import { C7zResponse } from '@model/definition';
import { Global } from '@model/global';
import { Encryption } from '@model/encryption';
import { Token } from '@model/token';

export class Authentication {
  static async login(options: { username: string, password: string }): Promise<{ token: string, refresh: string }> {
    if (Global.isEmpty(options?.username) || Global.isEmpty(options.password)) {
      throw { status: 400, method: 'Authentication.login', message: 'Invalid parameters' };
    }

    try {
      await Encryption.compare(options.username, ADMINISTRATOR_USERNAME);
    } catch {
      throw { status: 400, method: 'Authentication.login', message: 'Authentication failed' };
    }

    try {
      await Encryption.compare(options.password, ADMINISTRATOR_PASSWORD);
    } catch {
      throw { status: 400, method: 'Authentication.login', message: 'Authentication failed' };
    }

    const refresh = UUID();
    Token.addRefresh(refresh);

    return {
      token: Token.sign({ name: 'Administrator' }),
      refresh,
    };
  }

  static isLogged(): any {
    return async (req: Request, res: C7zResponse, next: any) => {
      try {
        const token = Token.getAccessToken(req);
        if (Global.isEmpty(token)) {
          throw { status: 401, message: `Token not found` };
        }

        Token.verify(token);
        next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
  }
}

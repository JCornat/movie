import { Request } from 'express';
import { v4 as UUID } from 'uuid';

import { Config } from '@config/config.ts';
import { C7zResponse } from '@model/definition.ts';
import { Global } from '@model/global.ts';
import { Encryption } from '@model/encryption.ts';
import { Token } from '@model/token.ts';

export namespace Authentication {
  export async function login(options: { username: string, password: string }): Promise<{ token: string, refresh: string }> {
    if (Global.isEmpty(options?.username) || Global.isEmpty(options.password)) {
      throw { status: 400, method: 'Authentication.login', message: 'Invalid parameters' };
    }

    try {
      await Encryption.compare(options.username, Config.ADMINISTRATOR_USERNAME);
    } catch {
      throw { status: 400, method: 'Authentication.login', message: 'Authentication failed' };
    }

    try {
      await Encryption.compare(options.password, Config.ADMINISTRATOR_PASSWORD);
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

  export function isLogged(): any {
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

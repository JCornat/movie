import { Request } from 'express';
import { v4 as UUID } from 'uuid';

import { ADMINISTRATOR_USERNAME, ADMINISTRATOR_PASSWORD } from '@config/config';
import { C7zResponse } from '@class/response';
import * as Encryption from './encryption';
import * as Global from './global';
import * as Token from './token';

export async function login(options: { username: string, password: string }): Promise<{ token: string, refresh: string }> {
  if (Global.isEmpty(options?.username) || Global.isEmpty(options.password)) {
    throw {status: 400, method: 'Authentication.login', message: 'Invalid parameters'};
  }

  try {
    await Encryption.compare(options.username, ADMINISTRATOR_USERNAME);
  } catch {
    throw {status: 400, method: 'Authentication.login', message: 'Authentication failed'};
  }

  try {
    await Encryption.compare(options.password, ADMINISTRATOR_PASSWORD);
  } catch {
    throw {status: 400, method: 'Authentication.login', message: 'Authentication failed'};
  }

  const refresh = UUID();
  Token.addRefresh(refresh);

  return {
    token: Token.sign({name: 'Administrator'}),
    refresh,
  };
}

export function isLogged(): any {
  return async (req: Request, res: C7zResponse, next: any) => {
    try {
      const token = Token.getAccessToken(req);
      if (Global.isEmpty(token)) {
        throw {status: 401, message: `Token not found`};
      }

      Token.verify(token);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

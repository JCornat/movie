import { ADMINISTRATOR_LOGIN, ADMINISTRATOR_PASSWORD } from '../config/config';
import * as Global from './global';
import * as Encryption from './encryption';
import * as Token from './token';
import { C7zResponse } from '../class/response';
import { Request } from 'express';
import { v4 as UUID } from 'uuid';

export async function login(options: {login: string, password: string}): Promise<{ token: string, refresh: string }> {
  if (Global.isEmpty(options?.login) || Global.isEmpty(options.password)) {
    throw new Error('Invalid parameters');
  }

  const loginValid = await Encryption.compare(options.login, ADMINISTRATOR_LOGIN);
  if (!loginValid) {
    throw new Error('Authentication failed');
  }

  const passwordValid = await Encryption.compare(options.password, ADMINISTRATOR_PASSWORD);
  if (!passwordValid) {
    throw new Error('Authentication failed');
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

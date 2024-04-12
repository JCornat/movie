import * as jwt from 'hono/utils/jwt/jwt.ts';

import { Config } from '@config/config.ts';
import { Global } from './global.ts';
import { PTokenCheckRefresh } from '@model/definition.ts';

const refreshTokens: string[] = [];

export namespace Token {
  export function getAccessToken(req: any): string {
    let token;

    if (req.headers && req.headers['x-access-token']) {
      token = req.headers['x-access-token'];
    } else if (req.body?.token) {
      token = req.body.token;
    } else if (req.query?.token) {
      token = req.query.token;
    } else if (req.handshake?.query?.token) {
      token = req.handshake.query.token;
    }

    return token;
  }

  export function decode(token: string): any {
    return jwt.decode(token);
  }

  export function verify(token: string, options: any = {}): any {
    try {
      return jwt.verify(token, Config.TOKEN_SIGNATURE, options);
    } catch (error) {
      handleError(error.name);
    }
  }

  export function handleError(errorName: string): null {
    switch (errorName) {
      case 'TokenExpiredError':
        throw { status: 401, message: 'TokenExpiredError' };
      case 'JsonWebTokenError':
      default:
        return null;
    }
  }

  export function sign(data: any): string {
    return jwt.sign(data, Config.TOKEN_SIGNATURE, { expiresIn: Config.TOKEN_EXPIRATION });
  }

  export function addRefresh(data: string): void {
    refreshTokens.push(data);
  }

  export async function checkRefresh(options: PTokenCheckRefresh): Promise<any> {
    if (Global.isEmpty(options.stringToken) || Global.isEmpty(options.refreshToken)) {
      throw { status: 400, message: 'Paramètres invalides' };
    }

    const token: Record<string, any> = decode(options.stringToken);

    if (Global.isEmpty(refreshTokens)) {
      throw { status: 401, message: 'Reconnexion nécessaire' };
    }

    let generate;

    for (const item of refreshTokens) {
      if (item === options.refreshToken) {
        generate = true;
        break;
      }
    }

    if (!generate) {
      throw { status: 401, message: 'Reconnexion nécessaire' };
    }

    const newToken = { // Recover token information
      ...token,
    };

    delete newToken.iat; // Except iat
    delete newToken.exp; // Except exp

    return {
      token: sign(newToken),
    };
  }
}

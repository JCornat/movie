import * as jwt from 'jsonwebtoken';

import { TOKEN_EXPIRATION, TOKEN_SIGNATURE } from '../config/config';

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

export function decode(token: string, options: any = {}): any {
  return jwt.decode(token, options);
}

export function verify(token: string, options: any = {}): any {
  try {
    return jwt.verify(token, TOKEN_SIGNATURE, options);
  } catch (error) {
    handleError(error.name);
  }
}

export function handleError(errorName: string) {
  switch (errorName) {
    case 'TokenExpiredError':
      throw {status: 401, message: 'TokenExpiredError'};
    case 'JsonWebTokenError':
    default:
      return null;
  }
}

export function sign(data: any): string {
  return jwt.sign(data, TOKEN_SIGNATURE, {expiresIn: TOKEN_EXPIRATION});
}

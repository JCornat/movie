import { Request, Router } from 'express';

import { C7zResponse } from '@model/definition';
import { Authentication } from '@model/authentication';
import { Token } from '@model/token';

export namespace AuthenticationController {
  export const router = Router();

  router.post('/api/login', async (req: Request, res: C7zResponse, next: any) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const options = {
        username,
        password,
      };

      const data = await Authentication.login(options);
      res.send(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/api/token', async (req: Request, res: C7zResponse, next: any) => {
    try {
      const refresh = req.body.refresh;
      const token = Token.getAccessToken(req);

      const data = await Token.checkRefresh(token, refresh);
      res.send(data);
    } catch (error) {
      return next(error);
    }
  });
}

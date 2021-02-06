import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Authentication from '../model/authentication';
import * as Token from '../model/token';

export const router = Router();

router.post('/api/login', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const options = {
      login,
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

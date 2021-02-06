import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Authentication from '../model/authentication';

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

import { Request, Response, Router } from 'express';
import { Authentication } from '@model/authentication';
import { Token } from '@model/token';

const authenticationRouter = Router();

authenticationRouter.post('/api/login', async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const options = {
    username,
    password,
  };

  const data = await Authentication.login(options);
  res.send(data);
});

authenticationRouter.post('/api/token', async (req: Request, res: Response) => {
  const refresh = req.body.refresh;
  const token = Token.getAccessToken(req);

  const data = await Token.checkRefresh(token, refresh);
  res.send(data);
});

export { authenticationRouter };

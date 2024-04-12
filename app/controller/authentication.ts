import { Hono } from 'hono';

import { PAuthenticationLogin } from '@model/definition.ts';
import { Authentication } from '@model/authentication.ts';
import { Token } from '@model/token.ts';
import { Context } from 'hono/context.ts';

export namespace AuthenticationController {
  export const router = new Hono();

  router.post('/login', async (c: Context) => {
    const body = await c.req.json<PAuthenticationLogin>();

    const data = await Authentication.login(body);
    return c.json(data);
  });

  router.post('/token', async (c: Context) => {
    const body = await c.req.json<{ refresh: string }>();
    const token = Token.getAccessToken(c.req);

    const data = await Token.checkRefresh({stringToken: token, refreshToken: body.refresh});
    return c.json(data);
  });
}

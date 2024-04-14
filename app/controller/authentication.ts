import { Hono } from 'hono';

import { PAuthenticationLogin } from '@model/definition.ts';
import { Authentication } from '@model/authentication.ts';
import { Token } from '@model/token.ts';
import { Context } from 'hono/context.ts';

export namespace AuthenticationController {
  export const router = new Hono();

  router.post('/login', async (context: Context) => {
    const body = await context.req.json<PAuthenticationLogin>();

    const data = await Authentication.login(body);
    return context.json(data);
  });

  router.post('/token', async (context: Context) => {
    const body = await context.req.json<{ refresh: string }>();
    const token = Token.getAccessToken(context.req);

    const data = await Token.checkRefresh({stringToken: token, refreshToken: body.refresh});
    return context.json(data);
  });
}

import express from 'express';

import { Config } from '@config/config';

export namespace PostMiddleware {
  export const app = express();

  const limit = `${Config.UPLOAD_MAX_SIZE / 1000000}mb`;
  app.use(express.urlencoded({ limit, extended: true }));
  app.use(express.json({ limit }));
}

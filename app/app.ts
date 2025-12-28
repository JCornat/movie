import 'module-alias/register';
import express from 'express';
import http from 'http';

import { assetMiddleware } from '@middleware/asset';
import { handleError } from '@middleware/error';
import { postMiddleware } from '@middleware/post';
import { securityMiddleware } from '@middleware/security';
import { config } from '@config/index';
import { authenticationRouter } from '@controller/authentication';
import { fileRouter } from '@controller/file';
import { gameController } from '@controller/game';
import { notFoundController } from '@controller/not-found';

init();

async function init(): Promise<void> {
  const app = express();
  app.use(securityMiddleware);
  app.use(postMiddleware);
  app.use(assetMiddleware);

  app.use(authenticationRouter);
  app.use(fileRouter);
  app.use(gameController);
  app.use(notFoundController);

  app.use(handleError);

  const server = http.createServer(app);
  server.listen(config.server.port);
  console.log(`Server running in ${config.server.nodeEnv} mode on port ${config.server.port} on address ${config.server.url}`);
}

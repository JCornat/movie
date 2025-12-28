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
import { mediaController } from '@controller/media';
import { serie } from '@model/serie';
import { game } from '@model/game';
import { movie } from '@model/movie';

export const app = express();
const server = http.createServer(app);

init();

async function init(): Promise<void> {
  app.use(securityMiddleware);
  app.use(postMiddleware);
  app.use(assetMiddleware);

  await movie.init();
  await serie.init();
  await game.init();

  app.use(authenticationRouter);
  app.use(fileRouter);
  app.use(mediaController);

  app.use(handleError);

  server.listen(config.server.port);
  console.log(`Server running in ${config.server.nodeEnv} mode on port ${config.server.port} on address ${config.server.url}`);

  app.emit('initialized');
}

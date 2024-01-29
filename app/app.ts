import 'module-alias/register';
import express from 'express';
import http from 'http';

import { AssetMiddleware } from '@middleware/asset';
import { ErrorMiddleware } from '@middleware/error';
import { PostMiddleware } from '@middleware/post';
import { SecurityMiddleware } from '@middleware/security';
import { Config } from '@config/config';
import { SendFileAsyncMiddleware } from '@middleware/send-file-async';
import { AuthenticationController } from '@controller/authentication';
import { FileController } from '@controller/file';
import { MediaController } from '@controller/media';
import { WebsiteController } from '@controller/website';
import { serie } from '@model/serie';
import { game } from '@model/game';
import { movie } from '@model/movie';

export const app = express();
const server = http.createServer(app);

init();

async function init(): Promise<void> {
  app.use(SecurityMiddleware.app);
  app.use(PostMiddleware.app);
  app.use(AssetMiddleware.app);
  app.use(SendFileAsyncMiddleware.app);

  await movie.init();
  await serie.init();
  await game.init();

  app.use(AuthenticationController.router);
  app.use(FileController.router);
  app.use(MediaController.router);
  app.use(WebsiteController.router);

  app.use(ErrorMiddleware.handle);

  server.listen(Config.PORT);
  console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);

  app.emit('initialized');
}

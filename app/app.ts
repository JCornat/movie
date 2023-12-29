import 'module-alias/register';
import express from 'express';
import * as http from 'http';

import * as AssetMiddleware from './middleware/asset';
import * as ErrorMiddleware from './middleware/error';
import * as PostMiddleware from './middleware/post';
import * as SecurityMiddleware from './middleware/security';

import * as Config from './config/config';
import * as SendFileAsyncMiddleware from './middleware/send-file-async';
import * as AuthenticationController from './controller/authentication';
import * as FileController from './controller/file';
import * as MediaController from './controller/media';
import * as WebsiteController from './controller/website';
import * as MovieModel from './model/movie';
import * as SerieModel from './model/serie';
import * as GameModel from './model/game';

export const app = express();
const server = http.createServer(app);

init();

async function init(): Promise<void> {
  app.use(SecurityMiddleware.app);
  app.use(PostMiddleware.app);
  app.use(AssetMiddleware.app);
  app.use(SendFileAsyncMiddleware.app);

  // Init models to load data in memory
  await MovieModel.init();
  await SerieModel.init();
  await GameModel.init();

  app.use(AuthenticationController.router);
  app.use(FileController.router);
  app.use(MediaController.router);
  app.use(WebsiteController.router);

  app.use(ErrorMiddleware.handle);

  server.listen(Config.PORT);
  console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);

  app.emit('initialized');
}

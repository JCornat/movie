import * as express from 'express';
import * as http from 'http';

import * as AssetMiddleware from './middleware/asset';
import * as ErrorMiddleware from './middleware/error';
import * as PostMiddleware from './middleware/post';
import * as SecurityMiddleware from './middleware/security';

import * as Config from './config/config';
import * as SendFileAsyncMiddleware from './middleware/send-file-async';
import * as FileController from './controller/file';
import * as MovieController from './controller/movie';
import * as MovieModel from './model/movie';

export const app = express();
const server = http.createServer(app);

init();

async function init() {
  app.use(SecurityMiddleware.app);
  app.use(PostMiddleware.app);
  app.use(AssetMiddleware.app);
  app.use(SendFileAsyncMiddleware.app);

  app.use(FileController.router);
  app.use(MovieController.router);

  app.use(ErrorMiddleware.handle);

  server.listen(Config.PORT);
  console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);

  app.emit('initialized');

  await MovieModel.init();
}
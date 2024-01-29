import express from 'express';
import path from 'node:path';

export namespace AssetMiddleware {
  export const app = express();

  app.use('/public', express.static(path.join(__dirname, '..', 'public')));
  app.use('/upload', express.static(path.join(__dirname, '..', 'public', 'upload')));
  app.use('/image', express.static(path.join(__dirname, '..', 'public', 'image')));
  app.use('/', express.static(path.join(__dirname, '..', 'www')));
  app.use('/www', express.static(path.join(__dirname, '..', 'www')));
  app.use('/assets', express.static(path.join(__dirname, '..', 'www', 'assets')));
}

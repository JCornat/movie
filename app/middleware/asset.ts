import express from 'express';
import path from 'node:path';

export namespace AssetMiddleware {
  export const app = express();

  const dirname = path.dirname(import.meta.url);
  // console.log(import.meta);
  app.use('/public', express.static(path.join(dirname, '..', 'public')));
  app.use('/upload', express.static(path.join(dirname, '..', 'public', 'upload')));
  app.use('/image', express.static(path.join(dirname, '..', 'public', 'image')));
  app.use('/', express.static(path.join(dirname, '..', 'www')));
  app.use('/www', express.static(path.join(dirname, '..', 'www')));
  app.use('/assets', express.static(path.join(dirname, '..', 'www', 'assets')));
}

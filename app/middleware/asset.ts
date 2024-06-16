import express from 'express';
import path from 'node:path';

export namespace AssetMiddleware {
  export const app = express();

  app.use('/public', express.static(path.join(__dirname, '..', 'public')));
  app.use('/upload', express.static(path.join(__dirname, '..', 'public', 'upload')));
  app.use('/image', express.static(path.join(__dirname, '..', 'public', 'image')));
}

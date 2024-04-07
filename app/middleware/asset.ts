import express from 'express';

export namespace AssetMiddleware {
  export const app = express();

  app.use('/public', express.static(`${Deno.cwd()}/app/public`));
  app.use('/upload', express.static(`${Deno.cwd()}/app/public/upload`));
  app.use('/image', express.static(`${Deno.cwd()}/app/public/image`));
  app.use('/', express.static(`${Deno.cwd()}/app/www`));
  app.use('/www', express.static(`${Deno.cwd()}/app/www`));
  app.use('/assets', express.static(`${Deno.cwd()}/app/www/assets`));
}

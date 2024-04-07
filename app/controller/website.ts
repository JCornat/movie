import { Request, Router } from 'express';
import path from 'node:path';

import { C7zResponse } from '@model/definition.ts';

export namespace WebsiteController {
  export const router = Router();

  router.get('/robots.txt', async (req: Request, res: C7zResponse, next: any) => {
    try {
      const filePath = path.join(__dirname, '..', 'public', 'robots.txt');
      await res.sendFileAsync(filePath);
    } catch (error) {
      return next({ status: 404, message: 'File not found' });
    }
  });

  router.get(/^(?!\/api.*).*/, async (req: Request, res: C7zResponse, next: any) => {
    try {
      const filePath = path.join(__dirname, '..', 'www', 'index.html');
      await res.sendFileAsync(filePath);
    } catch (error) {
      return next({ status: 404, message: 'File not found' });
    }
  });
}

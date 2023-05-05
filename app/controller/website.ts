import { Request, Router } from 'express';
import * as path from 'path';

import { C7zResponse } from '../class/response';

export const router = Router();

const blacklist = [
  '\/api\/',
  '\/public\/',
  '\/upload\/',
  '\/assets\/',
  '\/robots\.txt',
];

const regexp = new RegExp(`^(?!${blacklist.join('|')}).*`);
router.get(regexp, async (req: Request, res: C7zResponse, next: any) => {
  try {
    const filePath = path.join(__dirname, '..', 'www', 'index.html');
    await res.sendFileAsync(filePath);
  } catch (error) {
    return next({status: 404, message: 'File not found'});
  }
});

router.get('/robots.txt', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'robots.txt');
    await res.sendFileAsync(filePath);
  } catch (error) {
    return next({status: 404, message: 'File not found'});
  }
});

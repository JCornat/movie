import { Request, Router } from 'express';
import * as path from 'path';

import { C7zResponse } from '../class/response';

export const router = Router();

const blacklist = [
  '\/api\/',
  '\/public\/',
  '\/upload\/',
  '\/assets\/',
];

const regexp = new RegExp(`^(?!${blacklist.join('|')}).*`);
router.get(regexp, async (req: Request, res: C7zResponse, next: any) => {
  try {
    const filePath = path.join(__dirname, '..', 'www', 'index.html');
    await res.sendFileAsync(filePath);
  } catch (error) {
    console.error(error);
  }
});

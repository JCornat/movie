import { Request, Router } from 'express';
import { C7zResponse } from '../class/response';
import * as path from 'path';

export const router = Router();

router.get(/^(?!\/api.*).*/, async (req: Request, res: C7zResponse, next: any) => {
  try {
    const filePath = path.join(__dirname, '..', 'www', 'index.html');
    await res.sendFileAsync(filePath);
  } catch (error) {
    console.error(error);
  }
});

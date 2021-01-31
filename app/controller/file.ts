import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';

export const router = Router();

router.post('/api/file', async (req: Request, res: C7zResponse, next: any) => {
  try {
    // const data = await File.buildUpload(req);
    res.send({status: 200});
  } catch (error) {
    return next(error);
  }
});

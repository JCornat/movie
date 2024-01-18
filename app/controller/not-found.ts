import { Request, Router } from 'express';

import { C7zResponse } from '@model/definition';

export const router = Router();

router.use((req: Request, res: C7zResponse, next: any) => {
  try {
    res.sendStatus(404);
  } catch (error) {
    return next(error);
  }
});

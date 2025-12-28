import {Request, Response, Router} from 'express';

const router = Router();

router.use((_req: Request, res: Response) => {
  res.sendStatus(404);
});

export default router;

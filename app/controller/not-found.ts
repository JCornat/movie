import { Request, Response, Router } from 'express';

const notFoundController = Router();

notFoundController.use((_req: Request, res: Response) => {
  res.sendStatus(404);
});

export { notFoundController };

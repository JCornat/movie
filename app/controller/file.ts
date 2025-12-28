import { Request, Response, Router } from 'express';
import { File } from '@model/file';

const fileRouter = Router();

fileRouter.post('/api/file', async (req: Request, res: Response) => {
  const data = await File.buildUpload(req);
  res.send(data);
});

export { fileRouter };

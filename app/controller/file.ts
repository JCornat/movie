import { Request, Response, Router } from 'express';
import { config } from '@config/index';
import multer from 'multer';
import { processUpload } from '../hexagonal/util/file-upload';

const fileRouter = Router();

const upload = multer({
  dest: 'uploads/temp', // Temporary directory before moving
  limits: {
    fileSize: config.server.maxUploadSize,
  },
});

fileRouter.post('/api/file', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Aucun fichier envoyé' });
  }

  const data = await processUpload(req.file);
  res.send(data);
});

export { fileRouter };

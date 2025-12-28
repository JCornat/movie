import { config } from '@config/index';
import path from 'node:path';
import { v4 as UUID } from 'uuid';
import fsPromises from 'node:fs/promises';

export async function processUpload(file: Express.Multer.File): Promise<string> {
  if (!config.server.uploadPath) {
    throw { status: 400, message: `Répertoire de dépôt non configuré` };
  }

  const extensionName = path.extname(file.originalname).toLowerCase();
  const filename = `${UUID()}${extensionName}`;
  const destination = path.join(config.server.uploadPath, filename);

  try {
    await fsPromises.rename(file.path, destination);
  } catch (error) {
    console.error('File.processUpload', 'move', error);
    throw { status: 500, message: `Sauvegarde du fichier échouée` };
  }

  return `${config.server.url}/upload/${filename}`;
}

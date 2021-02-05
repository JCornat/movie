import * as fs from 'fs';
import * as multiparty from 'multiparty';
import * as path from 'path';
import { v4 as UUID } from 'uuid';

import { UPLOAD_MAX_SIZE } from '../config/config';
import * as Config from '../config/config';
import * as Global from '../model/global';
import { Request } from 'express';
import * as request from 'request';

export async function buildUpload(req: Request): Promise<string> {
  if (Global.isEmpty(Config.UPLOAD_PATH)) {
    throw {status: 400, message: `Répertoire de dépôt non configuré`};
  }

  let file: { fieldName: string, originalFilename: string, path: string, headers: any, size: number };

  try {
    file = await upload(req);
  } catch (error) {
    console.error('File.buildUpload', 'upload', error);
    throw {status: 500, message: error.message};
  }

  const extensionName = path.extname(file.path).toLowerCase();

  const filename = `${UUID()}${extensionName}`;
  const url = path.join(Config.UPLOAD_PATH, filename);

  try {
    await move(file.path, url);
  } catch (error) {
    console.error('File.buildUpload', 'move', error);
    throw {status: 500, message: `Sauvergarde de l'image échouée`};
  }

  return `${Config.URL}/upload/${filename}`;
}

// Upload file and return its filename
export function upload(req: Request): Promise<{ fieldName: string, originalFilename: string, path: string, headers: any, size: number }> {
  return new Promise((resolve, reject) => {
    const multipartyOptions = {
      maxFilesSize: UPLOAD_MAX_SIZE,
    };

    const form = new multiparty.Form(multipartyOptions);

    form.on('file', async (name, file) => {
      resolve(file);
    });

    form.on('error', (error) => {
      if (error.name === 'PayloadTooLargeError') {
        return reject(new Error(`La taille du fichier doit faire moins de ${UPLOAD_MAX_SIZE / 1000000} Mo`));
      }

      console.error('File.upload', 'error', error);
      reject(new Error(`Envoi du fichier échoué`));
    });

    form.parse(req);
  });
}

export function download(source: string, destination: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = {
      url: source,
      encoding: null,
    };

    request.get(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const buffer = Buffer.from(body, 'utf8');
      fs.writeFileSync(destination, buffer);
      resolve();
    });
  });
}

export function move(sourcePath: string, destinationPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.copyFile(sourcePath, destinationPath, async (error) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      fs.unlinkSync(sourcePath);
      resolve();
    });
  });
}

// Count lines of file
export function countLines(url: string): number {
  const fileBuffer = fs.readFileSync(url);
  const fileString = fileBuffer.toString();
  const lines = fileString.split('\n');
  return lines.length - 1;
}

export function write(filePath: string, data: any, options?: fs.WriteFileOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

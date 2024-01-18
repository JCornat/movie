import { Request } from 'express';
import { v4 as UUID } from 'uuid';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import multiparty from 'multiparty';
import path from 'node:path';

import { UPLOAD_MAX_SIZE } from '@config/config';
import * as Config from '@config/config';
import { Global } from './global';

export class File {
  static async read(sourcePath: string): Promise<any> {
    return await fsPromises.readFile(sourcePath, { encoding: 'utf8' });
  }

  static exists(sourcePath: string): boolean {
    return fs.existsSync(sourcePath);
  }

  static async move(sourcePath: string, destinationPath: string): Promise<void> {
    await fsPromises.copyFile(sourcePath, destinationPath);
    await fsPromises.unlink(sourcePath);
  }

  static async remove(sourcePath: string): Promise<void> {
    await fsPromises.unlink(sourcePath);
  }

  static async write(filePath: string, data: any, options?: any): Promise<void> {
    await fsPromises.writeFile(filePath, data, options);
  }

  static async buildUpload(req: Request): Promise<string> {
    if (Global.isEmpty(Config.UPLOAD_PATH)) {
      throw { status: 400, message: `Répertoire de dépôt non configuré` };
    }

    let file: { fieldName: string, originalFilename: string, path: string, headers: any, size: number };

    try {
      file = await this.upload(req);
    } catch (error) {
      console.error('File.buildUpload', 'upload', error);
      throw { status: 500, message: error.message };
    }

    const extensionName = path.extname(file.path).toLowerCase();

    const filename = `${UUID()}${extensionName}`;
    const url = path.join(Config.UPLOAD_PATH, filename);

    try {
      await this.move(file.path, url);
    } catch (error) {
      console.error('File.buildUpload', 'move', error);
      throw { status: 500, message: `Sauvergarde du fichier échouée` };
    }

    return `${Config.URL}/upload/${filename}`;
  }

  // Upload file and return its filename
  static upload(req: Request): Promise<{ fieldName: string, originalFilename: string, path: string, headers: any, size: number }> {
    return new Promise((resolve, reject) => {
      const multipartyOptions = {
        maxFilesSize: UPLOAD_MAX_SIZE,
      };

      const form = new multiparty.Form(multipartyOptions);

      form.on('file', (name, file) => {
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
}

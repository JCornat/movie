import fs from 'node:fs';
import imagemagick from 'imagemagick';
import path from 'node:path';

import * as Config from '@config/config';
import { Global } from '@model/global';
import { Http } from '@model/http';
import { File } from '@model/file';

export const IMAGE_EXTENSIONS = [
  '.bmp',
  '.gif',
  '.ico',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.tif',
  '.tiff',
  '.webp',
];

export class Image {
  static async optimize(imagePath: string, destinationPath: string): Promise<void> {
    const data = await this.identify(imagePath);
    const format = data.split('x');

    const width = +format[0];
    const height = +format[1];

    const MAX_SIZE = 1000;
    if (width < MAX_SIZE && height < MAX_SIZE) {
      await this.convert(imagePath, destinationPath);
    } else if (width > height) {
      await this.convert(imagePath, destinationPath, MAX_SIZE, null);
    } else {
      await this.convert(imagePath, destinationPath, null, MAX_SIZE);
    }

    const imageStats = fs.statSync(imagePath);
    const destinationStats = fs.statSync(destinationPath);
    if (imageStats.size < destinationStats.size) { // If original file is lighter than new one, then replace
      fs.copyFileSync(imagePath, destinationPath);
    }
  }

  static async convert(imagePath: string, destinationPath: string, maxWidth?: number, maxHeight?: number): Promise<void> {
    if (Global.isEmpty(imagePath) || Global.isEmpty(destinationPath)) {
      throw { status: 400, message: `Paramètres invalides` };
    }

    const convertOptions = [imagePath];
    if (Global.isNumber(maxWidth)) {
      convertOptions.push('-resize', `${maxWidth}x`);
    } else if (Global.isNumber(maxHeight)) {
      convertOptions.push('-resize', `x${maxHeight}`);
    }

    convertOptions.push('-quality', '80', destinationPath);

    return await new Promise((resolve, reject) => {
      imagemagick.convert(convertOptions, (error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    });
  }

  static async identify(filename: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      imagemagick.identify(['-format', '%wx%h', filename], (error, features) => {
        if (error) {
          console.error('ShareImage.identify', error);
          return reject(error);
        }

        resolve(features);
      });
    });
  }

  static async merge(filenames: string[], destinationPath: string): Promise<void> {
    return await new Promise(async (resolve, reject) => {
      const params = [
        '-density',
        '150',
        ...filenames,
        destinationPath,
      ];

      imagemagick.convert(params, (error) => {
        if (error) {
          console.error('ShareImage.merge', error);
          return reject(error);
        }

        resolve();
      });
    });
  }

  static async downloadAndConvert(options: { sourceUrl: string, basename: string, extensions: string[] }): Promise<string> {
    const extensionName = path.extname(options.sourceUrl).toLowerCase();
    const originalFilename = `${options.basename}${extensionName}`;
    const destinationTmpPath = path.join(Config.UPLOAD_PATH, originalFilename);
    await Http.download(options.sourceUrl, destinationTmpPath);

    for (const extension of options.extensions) {
      const filename = `${options.basename}.${extension}`;
      const destinationPath = path.join(Config.UPLOAD_PATH, filename);
      await this.convert(destinationTmpPath, destinationPath, null, 375);
    }

    return options.basename;
  }

  static async remove(options: { basename: string, extensions: string[] }): Promise<void> {
    for (const extension of options.extensions) {
      const filename = `${options.basename}.${extension}`;
      const destinationPath = path.join(Config.UPLOAD_PATH, filename);

      try {
        await File.remove(destinationPath);
      } catch {
      // Ignore if remove fail
      }
    }
  }
}

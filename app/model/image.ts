import fs from 'node:fs';
// import imagemagick from 'imagemagick';
import path from 'node:path';

import { Config } from '@config/config.ts';
import { Global } from '@model/global.ts';
import { Http } from '@model/http.ts';
import { File } from '@model/file.ts';

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

export namespace Image {
  export async function optimize(imagePath: string, destinationPath: string): Promise<void> {
    const data = await identify(imagePath);
    const format = data.split('x');

    const width = +format[0];
    const height = +format[1];

    const MAX_SIZE = 1000;
    if (width < MAX_SIZE && height < MAX_SIZE) {
      await convert(imagePath, destinationPath);
    } else if (width > height) {
      await convert(imagePath, destinationPath, MAX_SIZE, null);
    } else {
      await convert(imagePath, destinationPath, null, MAX_SIZE);
    }

    const imageStats = fs.statSync(imagePath);
    const destinationStats = fs.statSync(destinationPath);
    if (imageStats.size < destinationStats.size) { // If original file is lighter than new one, then replace
      fs.copyFileSync(imagePath, destinationPath);
    }
  }

  export async function convert(imagePath: string, destinationPath: string, maxWidth?: number, maxHeight?: number): Promise<void> {
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
      // imagemagick.convert(convertOptions, (error) => {
      //   if (error) {
      //     return reject(error);
      //   }

        resolve();
      // });
    });
  }

  export async function identify(filename: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      // imagemagick.identify(['-format', '%wx%h', filename], (error, features) => {
      //   if (error) {
      //     console.error('ShareImage.identify', error);
      //     return reject(error);
      //   }

        resolve({});
      // });
    });
  }

  export async function merge(filenames: string[], destinationPath: string): Promise<void> {
    return await new Promise(async (resolve, reject) => {
      const params = [
        '-density',
        '150',
        ...filenames,
        destinationPath,
      ];

      // imagemagick.convert(params, (error) => {
      //   if (error) {
      //     console.error('ShareImage.merge', error);
      //     return reject(error);
      //   }

        resolve();
      // });
    });
  }

  export async function downloadAndConvert(options: { sourceUrl: string, basename: string, extensions: string[] }): Promise<string> {
    const extensionName = path.extname(options.sourceUrl).toLowerCase();
    const originalFilename = `${options.basename}${extensionName}`;
    const destinationTmpPath = path.join(Config.UPLOAD_PATH, originalFilename);
    await Http.download(options.sourceUrl, destinationTmpPath);

    for (const extension of options.extensions) {
      const filename = `${options.basename}.${extension}`;
      const destinationPath = path.join(Config.IMAGE_PATH, filename);
      await convert(destinationTmpPath, destinationPath, null, 375);
    }

    return options.basename;
  }

  export async function remove(options: { basename: string, extensions: string[] }): Promise<void> {
    for (const extension of options.extensions) {
      const filename = `${options.basename}.${extension}`;
      const destinationPath = path.join(Config.IMAGE_PATH, filename);

      try {
        await File.remove(destinationPath);
      } catch {
        // Ignore if remove fail
      }
    }
  }
}

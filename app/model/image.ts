import { v4 as UUID } from 'uuid';
import * as fs from 'fs';
import * as imagemagick from 'imagemagick';
import * as path from 'path';

import * as Config from '@config/config';
import * as File from '@model/file';
import * as Global from './global';
import * as Http from '@model/http';

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
    throw {status: 400, message: `Paramètres invalides`};
  }

  const convertOptions = [imagePath];
  if (Global.isNumber(maxWidth)) {
    convertOptions.push('-resize', `${maxWidth}x`);
  } else if (Global.isNumber(maxHeight)) {
    convertOptions.push('-resize', `x${maxHeight}`);
  }

  convertOptions.push('-quality', '80', destinationPath);

  return new Promise((resolve, reject) => {
    imagemagick.convert(convertOptions, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}

export async function identify(filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    imagemagick.identify(['-format', '%wx%h', filename], (error, features) => {
      if (error) {
        console.error('ShareImage.identify', error);
        return reject(error);
      }

      resolve(features);
    });
  });
}

export async function merge(filenames: string[], destinationPath: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const params = ['-density', '150', ...filenames, destinationPath];

    imagemagick.convert(params, (error) => {
      if (error) {
        console.error('ShareImage.merge', error);
        return reject(error);
      }

      resolve();
    });
  });
}

export async function downloadAndConvert(options: { sourceUrl: string, destinationBasename: string, extensions: string[] }): Promise<string> {
  const extensionName = path.extname(options.sourceUrl).toLowerCase();
  const originalFilename = `${options.destinationBasename}${extensionName}`;
  const destinationTmpPath = path.join(Config.UPLOAD_PATH, originalFilename);
  await Http.download(options.sourceUrl, destinationTmpPath);

  for (const extension of options.extensions) {
    const destinationFilename = `${options.destinationBasename}.${extension}`;
    const destinationPath = path.join(Config.UPLOAD_PATH, destinationFilename);
    await convert(destinationTmpPath, destinationPath, null, 375);
  }

  return options.destinationBasename;
}

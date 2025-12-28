import imagemagick from 'imagemagick';
import { ConvertOptions, ImageConverterProvider } from '../../domain/provider/image-converter.provider';

export class ImageConverterImageMagickProvider implements ImageConverterProvider {
  async convert(options: ConvertOptions): Promise<void> {
    const quality = options.quality || 80;

    const convertOptions: (string | number)[] = [];
    if (options.maxWidth) {
      convertOptions.push('-resize', `${options.maxWidth}x`);
    } else if (options.maxHeight) {
      convertOptions.push('-resize', `x${options.maxHeight}`);
    }

    if (options.density) {
      convertOptions.push('-density', options.density);
    }

    if (options.background) {
      convertOptions.push('-background', options.background);
    }

    if (options.alpha) {
      convertOptions.push('-alpha', options.alpha);
    }

    if (options.append) {
      convertOptions.push('-append');
    }

    convertOptions.push('-quality', quality);
    if (options.range) {
      convertOptions.push(`${options.imagePath}[0-${options.range}]`);
    } else {
      convertOptions.push(options.imagePath);
    }

    convertOptions.push(options.destinationPath);

    return await new Promise((resolve, reject) => {
      try {
        imagemagick.convert(convertOptions, (error) => {
          if (error) {
            return reject(error);
          }

          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async identify(filename: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      try {
        imagemagick.identify(['-format', '%wx%h', filename], (error, features) => {
          if (error) {
            console.error('ImageMagickConverterProvider.identify', error);
            return reject(error);
          }

          resolve(features);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async merge(filenames: string[], destinationPath: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      const params = [
        '-density',
        '150',
        ...filenames,
        destinationPath,
      ];

      try {
        imagemagick.convert(params, (error) => {
          if (error) {
            console.error('ImageMagickConverterProvider.merge', error);
            return reject(error);
          }

          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const defaultImageConverterProvider = new ImageConverterImageMagickProvider();

import fs from 'node:fs';
import Request from 'request';

import { Global } from './global';

export class Http {
  static async get(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any | string> {
    return await this.build('get', url, form, options);
  }

  static async post(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    return await this.build('post', url, form, options);
  }

  static async put(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    return await this.build('put', url, form, options);
  }

  static async del(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any | string> {
    return await this.build('delete', url, form, options);
  }

  static async download(url: string, destinationPath: string): Promise<void> {
    const file = fs.createWriteStream(destinationPath);

    return await new Promise((resolve, reject) => {
      const stream = Request({ url })
        .pipe(file)
        .on('finish', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  static build(method: string, url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const requestOptions: any = {
        url,
      };

      requestOptions.headers = {};

      if (Global.isPopulated(options.headers)) {
        requestOptions.headers = {
          ...options.headers,
        };
      }

      if (form.token) {
        requestOptions.headers['X-Access-Token'] = form.token;
        delete form.token;
      }

      switch (method) {
        case 'get':
        case 'delete':
          requestOptions.qs = form;
          break;
        case 'put':
        case 'post':
          requestOptions.form = form;
          break;
        default:
          console.error('Method not supported', method, url);
          throw new Error('Method not supported');
      }

      Request[method](requestOptions, (error, response) => {
        if (error) {
          return reject(error);
        }

        const res = {
          status: response.statusCode,
          body: response.body,
        };

        if (res.status >= 400) {
          const err = {
            status: res.status,
            message: res.body || undefined,
          };

          return reject(err);
        }

        let data;

        try {
          data = JSON.parse(res.body);
        } catch {
          data = res.body;
        }

        if (options?.resolveHeaders) {
          return resolve({
            content: data,
            headers: response.rawHeaders,
          });
        }

        resolve(data);
      });
    });
  }
}

import express, { Request } from 'express';

import { C7zResponse } from '@model/definition.ts';

export namespace SendFileAsyncMiddleware {
  export const app = express();

  app.use((req: Request, res: C7zResponse, next: any) => {
    res.sendFileAsync = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const options = {};
        res.sendFile(url, options, (error) => {
          if (error) {
            return reject(error);
          }

          resolve();
        });
      });
    };

    next();
  });
}

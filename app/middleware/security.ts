import express from 'express';
import cors from 'npm:cors';

export namespace SecurityMiddleware {
  export const app = express();

  app.use(cors({}));
}

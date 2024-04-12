import { File } from '@model/file.ts';
import { Hono } from 'hono';
import { Context } from 'hono/context.ts';

export namespace FileController {
  export const router = new Hono();

  router.post('/api/file', async (c: Context) => {
    const data = await File.buildUpload(c.req);
    return c.json(data);
  });
}

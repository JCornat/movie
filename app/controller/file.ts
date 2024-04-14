import { File } from '@model/file.ts';
import { Hono } from 'hono';
import { Context } from 'hono/context.ts';

export namespace FileController {
  export const router = new Hono();

  router.post('/api/file', async (context: Context) => {
    const data = await File.buildUpload(context.req);
    return context.json(data);
  });
}

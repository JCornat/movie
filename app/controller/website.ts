import { Hono } from 'hono';
import { Context } from 'hono/context.ts';

export namespace WebsiteController {
  export const router = new Hono();

  router.get('/robots.txt', async (context: Context) => {
    const filePath = path.join(__dirname, '..', 'public', 'robots.txt');
    await res.sendFileAsync(filePath);
  });

  router.get(/^(?!\/api.*).*/, async (context: Context) => {
    const filePath = path.join(__dirname, '..', 'www', 'index.html');
    await res.sendFileAsync(filePath);
  });
}

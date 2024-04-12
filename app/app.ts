import { Hono } from 'hono';

import { Config } from '@config/config.ts';
import { serie } from '@model/serie.ts';
import { game } from '@model/game.ts';
import { movie } from '@model/movie.ts';
import { Context } from 'hono/context.ts';
import { cors, serveStatic } from 'hono/middleware.ts';
import { AuthenticationController } from '@controller/authentication.ts';
import { MediaController } from '@controller/media.ts';
import { FileController } from '@controller/file.ts';

const app = new Hono();

await movie.init();
await serie.init();
await game.init();

app.use('/api/*', cors({origin: ['http://localhost:4200']}))
app.use('/public/*', serveStatic({root: `./public`}));
app.use('/upload/*', serveStatic({root: `./public`}));
app.use('/image/*', serveStatic({root: `./public`}));
app.use('/www/*', serveStatic({root: `./www`}));
app.use('/assets/*', serveStatic({root: `./www`}));

app.route('/api', AuthenticationController.router);
app.route('/api', MediaController.router);
app.route('/api', FileController.router);

app.notFound((c: Context) => c.json({status: 404, message: 'Not Found'}, 404));

Deno.serve({port: Config.PORT}, app.fetch);
console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);

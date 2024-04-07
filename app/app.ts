import express from 'express';
import http from 'node:http';

import { AssetMiddleware } from '@middleware/asset.ts';
import { ErrorMiddleware } from '@middleware/error.ts';
import { PostMiddleware } from '@middleware/post.ts';
import { SecurityMiddleware } from '@middleware/security.ts';
import { Config } from '@config/config.ts';
import { SendFileAsyncMiddleware } from '@middleware/send-file-async.ts';
import { AuthenticationController } from '@controller/authentication.ts';
import { FileController } from '@controller/file.ts';
import { MediaController } from '@controller/media.ts';
import { WebsiteController } from '@controller/website.ts';
import { serie } from '@model/serie.ts';
import { game } from '@model/game.ts';
import { movie } from '@model/movie.ts';

export const app = express();

app.use(SecurityMiddleware.app);
app.use(PostMiddleware.app);
app.use(AssetMiddleware.app);
app.use(SendFileAsyncMiddleware.app);

await movie.init();
await serie.init();
await game.init();

app.use(AuthenticationController.router);
app.use(FileController.router);
app.use(MediaController.router);
app.use(WebsiteController.router);

app.use(ErrorMiddleware.handle);

const server = http.createServer(app);
server.listen(Config.PORT);
console.log(`Server running in ${Config.MODE} mode on port ${Config.PORT} on address ${Config.URL}`);

app.emit('initialized');

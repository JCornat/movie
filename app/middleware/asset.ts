import * as express from 'express';
import * as path from 'path';

export const app = express();

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/upload', express.static(path.join(__dirname, '..', 'public', 'image')));

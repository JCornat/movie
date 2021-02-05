import * as express from 'express';
import * as path from 'path';

export const app = express();

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/upload', express.static(path.join(__dirname, '..', 'public', 'image')));
app.use('/www', express.static(path.join(__dirname, '..', 'www')));
app.use('/assets', express.static(path.join(__dirname, '..', 'www', 'assets')));

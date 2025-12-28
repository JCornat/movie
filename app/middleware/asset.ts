import express from 'express';
import path from 'node:path';

const assetMiddleware = express();

assetMiddleware.use('/public', express.static(path.join(__dirname, '..', 'public')));
assetMiddleware.use('/upload', express.static(path.join(__dirname, '..', 'public', 'upload')));
assetMiddleware.use('/image', express.static(path.join(__dirname, '..', 'public', 'image')));

export { assetMiddleware };

import * as express from 'express';

import { UPLOAD_MAX_SIZE } from '../config/config';

export const app = express();

const limit = `${UPLOAD_MAX_SIZE / 1000000}mb`;
app.use(express.urlencoded({limit, extended: true}));
app.use(express.json({limit}));

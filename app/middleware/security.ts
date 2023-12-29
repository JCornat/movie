import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export const app = express();

app.use(cors({}));
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false }));
app.set('x-powered-by', false);

import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';

export const app = express();

app.use(cors({}));
app.use(helmet({contentSecurityPolicy: false, crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false}));
app.set('x-powered-by', false);

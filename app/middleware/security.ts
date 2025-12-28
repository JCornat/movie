import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from '../config';

const securityMiddleware = express();

securityMiddleware.use(cors({
  origin: (origin, callback) => {
    // Allow requests without origin header (mobile apps, curl)
    if (!origin) return callback(null, true);

    // Validate origin against allowed list
    if (
      config.cors.allowedOrigins.indexOf(origin) !== -1 ||
      config.cors.allowedOrigins.indexOf('*') !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: config.cors.allowedMethods,
  allowedHeaders: config.cors.allowedHeaders,
  credentials: true,
  optionsSuccessStatus: 200, // Support legacy browsers
  maxAge: 86400, // Cache preflight for 24 hours
}));

securityMiddleware.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [`'self'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
    },
  },
}));

securityMiddleware.set('x-powered-by', false);

export { securityMiddleware };

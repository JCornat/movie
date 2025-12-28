import express from 'express';

const postMiddleware = express();

postMiddleware.use(express.urlencoded({extended: true}));
postMiddleware.use(express.json({limit: '10mb'}));

export {postMiddleware};
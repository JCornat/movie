import { Response } from 'express';

export interface C7zResponse extends Response {
  sendFileAsync: any;
}

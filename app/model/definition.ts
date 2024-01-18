import { Response } from 'express';

export interface C7zResponse extends Response {
  sendFileAsync: any;
}

export type Rating = number | 'todo' | 'progress';

export interface Media {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  urlWebp?: string;
}

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export interface IGame extends Media {
  //
}

export interface IMovie extends Media {
  //
}

export interface ISerie extends Media {
  //
}

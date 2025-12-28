import { Rating } from '../hexagonal/shared/domain/rating';

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export interface IMedia {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  urlWebp?: string;
}

export interface MediaAddParameters {
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  [key: string]: any;
}

export interface MediaUpdateParameters extends MediaAddParameters {
  //
}

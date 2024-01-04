import { Rating } from '../../types/rating.type';

export interface Medium {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url: string;
  urlWebp: string;
}

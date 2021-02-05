import { Movie } from './movie';

export interface Category {
  label: string;
  limit: number;
  orderBy: string;
  movies: Movie[];
}

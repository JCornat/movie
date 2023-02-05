import { Game } from './game';
import { Movie } from "@app/movie/movie";
import { Serie } from "@app/serie/serie";

export interface Category {
  label: string;
  limit: number;
  orderBy: string;
  media: (Game | Movie | Serie)[];
}

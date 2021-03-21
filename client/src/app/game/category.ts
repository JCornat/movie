import { Game } from './game';

export interface Category {
  label: string;
  limit: number;
  orderBy: string;
  games: Game[];
}

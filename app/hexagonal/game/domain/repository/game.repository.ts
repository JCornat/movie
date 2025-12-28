import { MediaAddParameters } from '@model/definition';

export type Rating = number | 'todo' | 'progress';

export interface StoredGame {
  id: string;
  title: string;
  year: number;
  rating: Rating;
}

export interface GameRepository {
  getAll(): Promise<StoredGame[]>;
  getOne(id: string): Promise<StoredGame | undefined>;
  save(game: MediaAddParameters): Promise<string>;
  delete(id: string): Promise<void>;
}

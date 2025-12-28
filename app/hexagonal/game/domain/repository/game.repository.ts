export type Rating = number | 'todo' | 'progress';

export interface StoredGame {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  urlWebp?: string;
}

export interface GameRepository {
  getAll(): Promise<StoredGame[]>;
  getOne(id: string): Promise<StoredGame | undefined>;
  save(game: StoredGame): Promise<void>;
  delete(id: string): Promise<void>;
}

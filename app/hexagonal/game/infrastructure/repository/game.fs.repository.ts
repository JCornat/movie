import { GameRepository, StoredGame } from '../../domain/repository/game.repository';

export class GameFsRepository implements GameRepository {
  getAll(): Promise<StoredGame[]> {
    return Promise.resolve([]);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getOne(id: string): Promise<StoredGame | undefined> {
    return Promise.resolve(undefined);
  }

  save(game: StoredGame): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export const defaultGameRepository = new GameFsRepository();

import { GameRepository, StoredGame } from '../../domain/repository/game.repository';
import { MediaStore } from '../../../util/media-store';

export class GameFsRepository implements GameRepository {
  private _initializedStore: MediaStore<StoredGame> | null = null;

  async getAll(): Promise<StoredGame[]> {
    const store = await this.getStore();
    return store.getAll();
  }

  async delete(id: string): Promise<void> {
    const store = await this.getStore();
    return await store.remove(id);
  }

  async getOne(id: string): Promise<StoredGame | undefined> {
    const store = await this.getStore();
    return store.getOne(id);
  }

  async save(game: StoredGame): Promise<void> {
    const store = await this.getStore();
    return await store.update(game.id, game);
  }

  private async getStore() {
    if (!this._initializedStore) {
      this._initializedStore = new MediaStore('game');
      await this._initializedStore.init();
    }

    return this._initializedStore;
  }
}

export const defaultGameRepository = new GameFsRepository();

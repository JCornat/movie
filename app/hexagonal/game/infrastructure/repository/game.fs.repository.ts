import { GameRepository, StoredGame } from '../../domain/repository/game.repository';
import { MediaStore } from '../../../util/media-store';
import { MediaAddParameters } from '@model/definition';

export class GameFsRepository implements GameRepository {
  private _initializedStore: MediaStore<StoredGame> | null = null;

  async getAll() {
    const store = await this.getStore();
    return store.getAll();
  }

  async delete(id: string) {
    const store = await this.getStore();
    return await store.remove(id);
  }

  async getOne(id: string) {
    const store = await this.getStore();
    return store.getOne(id);
  }

  async save(game: MediaAddParameters) {
    const store = await this.getStore();
    return await store.add(game);
  }

  private async getStore(): Promise<MediaStore<StoredGame>> {
    if (!this._initializedStore) {
      this._initializedStore = new MediaStore('game');
      await this._initializedStore.init();
    }

    return this._initializedStore;
  }
}

export const defaultGameRepository = new GameFsRepository();

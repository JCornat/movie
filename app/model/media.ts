import { Store } from '@model/store';
import { IMedia, ImportMedia, MediaAddParameters } from '@model/definition';

/**
 * Implements a generic media class
 */
export abstract class Media {
  store: Store<IMedia>;
  name: string;

  async createStore(name: string): Promise<void> {
    this.store = new Store(name);
    await this.store.init();
  }

  getAll(): IMedia[] {
    return this.store.getAll();
  }

  getOne(id: string): IMedia {
    return this.store.getOne(id);
  }

  async add(options: MediaAddParameters): Promise<string> {
    return await this.store.add(options);
  }

  async remove(id: string): Promise<void> {
    await this.store.remove(id);
  }

  async update(id: string, data: IMedia): Promise<void> {
    await this.store.update(id, data);
  }

  search(title: string): Promise<ImportMedia[]> {
    throw { status: 500, method: 'Media.search', message: `Not implemented` };
  }

  importOne(id: string): Promise<ImportMedia> {
    throw { status: 500, method: 'Media.importOne', message: `Not implemented` };
  }
}

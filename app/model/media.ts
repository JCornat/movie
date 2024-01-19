import { Store } from '@model/store';
import { IMedia, ImportMedia, MediaAddParameters } from '@model/definition';

/**
 * Implements a generic media class
 */
export class Media {
  static store: Store<IMedia>;
  static name: string;

  static async createStore(name: string): Promise<void> {
    this.store = new Store(name);
    await this.store.init();
  }

  static getAll(): IMedia[] {
    return this.store.getAll();
  }

  static getOne(id: string): IMedia {
    return this.store.getOne(id);
  }

  static async add(options: MediaAddParameters): Promise<string> {
    return await this.store.add(options);
  }

  static async remove(id: string): Promise<void> {
    await this.store.remove(id);
  }

  static async update(id: string, data: IMedia): Promise<void> {
    await this.store.update(id, data);
  }

  static search(title: string): Promise<ImportMedia[]> {
    throw { status: 500, method: 'Media.search', message: `Not implemented` };
  }

  static importOne(id: string): Promise<ImportMedia> {
    throw { status: 500, method: 'Media.importOne', message: `Not implemented` };
  }
}

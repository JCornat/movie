import path from 'node:path';
import { z } from 'zod';
import { ArgumentInvalidException } from './exception';
import { FileSystemProvider } from './domain/provider/file-system.provider';
import { defaultFileSystemProvider } from './infrastructure/provider/file-system.node.provider';

export class BaseStore<T extends { id: string }> {
  protected collection: Record<string, T> = {};
  protected readonly filePath: string;

  constructor(
    protected readonly name: string,
    protected readonly fileSystemProvider: FileSystemProvider = defaultFileSystemProvider,
  ) {
    const res = z.string().trim().safeParse(name);
    if (!res.success) {
      throw new ArgumentInvalidException(`Invalid store name : ${name}`);
    }

    const safeName = res.data;
    this.filePath = path.join(process.cwd(), 'config', `${safeName}.json`);
  }

  async init(): Promise<void> {
    if (await this.fileSystemProvider.exists(this.filePath)) {
      const content = await this.fileSystemProvider.readTextFile(this.filePath);
      const tmp = JSON.parse(content) as T[];
      this.collection = tmp.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: cur,
      }), {});
    }
  }

  protected async save(): Promise<void> {
    await this.fileSystemProvider.writeFile(this.filePath, JSON.stringify(Object.values(this.collection), null, 2));
  }

  getAll(): T[] {
    return Object.values(this.collection);
  }

  getOne(id: string): T {
    const item = this.collection[id];
    if (!item) {
      throw { status: 404, method: 'Store.getOne', message: `${this.name} not found` };
    }

    return item;
  }
}

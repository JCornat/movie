import path from 'node:path';
import { File } from '@model/file';
import { z } from 'zod';
import { ArgumentInvalidException } from '../lib/exception';

export class BaseStore<T extends { id: string }> {
  protected collection: Record<string, T> = {};
  protected readonly filePath: string;

  constructor(
    protected readonly name: string,
  ) {
    const res = z.string().trim().safeParse(name);
    if (!res.success) {
      throw new ArgumentInvalidException(`Invalid store name : ${name}`);
    }

    const safeName = res.data;
    this.filePath = path.join(process.cwd(), 'config', `${safeName}.json`);
  }

  async init(): Promise<void> {
    if (File.exists(this.filePath)) {
      const content = await File.read(this.filePath);
      const tmp = JSON.parse(content) as T[];
      this.collection = tmp.reduce((acc, cur) => ({
        ...acc,
        [cur.id]: cur,
      }), {});
    }
  }

  protected async save(): Promise<void> {
    await File.write(this.filePath, JSON.stringify(Object.values(this.collection), null, 2));
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

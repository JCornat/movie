import path from 'node:path';
import { Global } from '@model/global';
import { File } from '@model/file';
import { Random } from '@model/random';
import { Image } from '@model/image';
import { MediaAddParameters, MediaUpdateParameters } from '@model/definition';
import { Config } from '@config/config';

export class Store<T> {
  collection: T;
  name: string;
  filePath: string;

  constructor(name: string) {
    if (Global.isEmpty(name)) {
      throw { status: 400, method: 'Store.constructor', message: `Paramètres invalides` };
    }

    this.name = name;
    this.filePath = path.join(__dirname, '..', 'config', `${this.name}.json`);
  }

  async init(): Promise<void> {
    let data = {};
    if (File.exists(this.filePath)) {
      const content = await File.read(this.filePath);
      const tmp = JSON.parse(content);
      data = Global.arrayToObject(tmp, 'id');
    }

    this.apply(data as T);
  }

  apply(data: T): void {
    this.collection = data;
  }

  async save(): Promise<void> {
    const scenes = Object.values(this.collection);
    await File.write(this.filePath, JSON.stringify(scenes));
  }

  getAll(): T[] {
    return Object.values(this.collection);
  }

  getOne(id: string): T {
    const res = this.collection[id];
    if (Global.isEmpty(res)) {
      throw { status: 500, method: 'Store.getOne', message: `Media not found` };
    }

    return res;
  }

  async add(data: MediaAddParameters): Promise<string> {
    const id = Random.generate();

    if (!data.url.includes(`${Config.URL}/image`)) {
      await Image.downloadAndConvert({ sourceUrl: data.url, basename: id, extensions: ['webp', 'jpg'] });
    }

    delete data.url;

    this.collection[id] = {
      ...data,
      id,
    };

    await this.save();
    return id;
  }

  async update(id: string, data: MediaUpdateParameters): Promise<void> {
    this.getOne(id); // Get one to check if existing

    if (!data.url.includes(`${Config.URL}/image`)) {
      await Image.downloadAndConvert({ sourceUrl: data.url, basename: id, extensions: ['webp', 'jpg'] });
    }

    delete data.url;

    this.collection[id] = {
      ...data,
      id,
    };

    await this.save();
  }

  async remove(id: string): Promise<void> {
    this.getOne(id); // Get one to check if existing
    delete this.collection[id];

    await Image.remove({ basename: id, extensions: ['webp', 'jpg'] });
    await this.save();
  }
}

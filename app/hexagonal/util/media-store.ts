import { BaseStore } from './base-store';
import { Random } from '@model/random';
import { Image } from '@model/image';
import { config } from '@config/index';
import { MediaAddParameters, MediaUpdateParameters } from '@model/definition';

export class MediaStore<T extends { id: string }> extends BaseStore<T> {
  async add(params: MediaAddParameters): Promise<string> {
    const id = Random.generate();
    await this.processImage(id, params.url);

    const { url, ...dataWithoutUrl } = params;
    this.collection[id] = { ...dataWithoutUrl, id } as unknown as T;

    await this.save();
    return id;
  }

  async update(id: string, params: MediaUpdateParameters): Promise<void> {
    this.getOne(id); // Ensure exists
    await this.processImage(id, params.url);

    const { url, ...dataWithoutUrl } = params;
    this.collection[id] = { ...dataWithoutUrl, id } as unknown as T;

    await this.save();
  }

  async remove(id: string): Promise<void> {
    this.getOne(id);
    delete this.collection[id];
    await Image.remove({ basename: id, extensions: ['webp', 'jpg'] });
    await this.save();
  }

  private async processImage(id: string, url?: string): Promise<void> {
    if (!url || url.includes(`${config.server.url}/image`)) {
      return;
    }

    await Image.downloadAndConvert({
      sourceUrl: url,
      basename: id,
      extensions: ['webp', 'jpg'],
    });
  }
}

import { WritableSignal } from "@angular/core";
import { ImportMedia, Media } from "./media";
import { Category } from "./category";

export abstract class MediaService {
  #searchCache: any;
  #mediaSignal!: WritableSignal<Category[]>;
  abstract update(options: { [key: string]: any }): Promise<void>;
  abstract search(title: string): Promise<ImportMedia[]>;

  setCache(cache: any) {
    this.#searchCache = cache;
  }

  getCache(): any {
    return this.#searchCache;
  }

  clearCache() {
    this.#searchCache = undefined;
  }

  setMediaSignal(mediaSignal: WritableSignal<Category[]>) {
    this.#mediaSignal = mediaSignal;
  }

  // Signals Media
  mediaAlreadyPresent(title:string):boolean {
    console.log(title)
    return this.#mediaSignal().flatMap(cat => cat.media).find(media => media.title === title) != null;
  }

  addMedia(media: Media) {
    this.#mediaSignal.update((values: Category[]) => {
      const data = [...values];
      data
        .find((category: Category) => category.value === media.rating)
        ?.media.push(media);
      return data;
    });
  }

  removeMedia(id: string) {
    this.#mediaSignal.update((values: Category[]) => {
      const data = [...values];
      for (const datum of data) {
        datum.media = datum.media.filter((media) => media.id !== id);
      }

      return data;
    });
  }

  updateMedia(obj: any) {
    this.#mediaSignal.update((values) => {
      const data = [...values];
      data.forEach((category) => {
        const foundMedia = category.media.find((media) => media.id === obj.id);
        if (!foundMedia) return;
        
        const index = category.media.indexOf(foundMedia);     
        category.media.splice(index, 1);
                
        const newCategory = data.find((c) => c.value === obj.rating);
        if (newCategory) {
          newCategory.media.push(foundMedia);
        }

        Object.assign(foundMedia, obj);
      });
      return data;
    });
  }
}

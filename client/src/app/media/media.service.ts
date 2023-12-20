import { ImportMedia } from "./media";

export abstract class MediaService
{
    #searchCache: any;
    setCache(cache:any){
      this.#searchCache = cache;
    }
    getCache():any{
      return this.#searchCache;
    }
    clearCache(){
      this.#searchCache = undefined;
    }

    abstract update(options: { [key: string]: any }): Promise<void>
    abstract search(title: string): Promise<ImportMedia[]> 
}
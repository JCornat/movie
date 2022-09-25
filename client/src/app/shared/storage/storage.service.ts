import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    //
  }

  public async clear(): Promise<any> {
    return localStorage.clear();
  }

  public async getItem(key: string): Promise<any> {
    return localStorage.getItem(key);
  }

  public async setItem(key: string, value: string): Promise<any> {
    localStorage.setItem(key, value);
  }

  public async removeItem(key: string): Promise<any> {
    localStorage.removeItem(key);
  }
}

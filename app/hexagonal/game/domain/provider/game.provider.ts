export interface SearchItem {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export interface GameProvider {
  search(title: string): Promise<SearchItem[]>;
  fetchOne(importId: string): Promise<SearchItem>;
}

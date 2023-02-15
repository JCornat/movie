export interface Media {
  id: string;
  title: string;
  year: number;
  rating: number | 'todo';
  url?: string;
  urlWebp?: string;
}

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

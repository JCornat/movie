export type Rating = 'todo' | 'progress' | 'done';

export interface Media {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url: string;
  urlWebp: string;
}

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

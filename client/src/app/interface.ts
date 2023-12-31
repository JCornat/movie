import { WritableSignal } from '@angular/core';

export type Rating = number | 'todo' | 'progress';

export interface Media {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url: string;
  urlWebp: string;
}

export interface Movie extends Media {
  //
}

export interface Game extends Media {
  //
}

export interface Serie extends Media {
  //
}

export type MediaType = 'movie' | 'serie' | 'game';

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export interface Category {
  label: string;
  limit: number;
  orderBy: string;
  media: (Game | Movie | Serie)[];
}

export interface MediaListElement {
  title: string;
  description: string;
  url: string;
  data: WritableSignal<Movie[] | Serie[] | Game[]>;
}

export interface HeaderLink {
  label: string;
  path: string;
  active?: boolean;
}

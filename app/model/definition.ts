export type Rating = number | 'todo' | 'progress';

export interface ImportMedia {
  importId: string;
  title: string;
  year: number;
  url: string;
}

export interface IMedia {
  id: string;
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  urlWebp?: string;
}

export interface IGame extends IMedia {
  //
}

export interface IMovie extends IMedia {
  //
}

export interface ISerie extends IMedia {
  //
}

export interface MediaAddParameters {
  title: string;
  year: number;
  rating: Rating;
  url?: string;
  [key: string]: any;
}

export interface MediaUpdateParameters extends MediaAddParameters {
  //
}

export interface PAuthenticationLogin {
  username: string;
  password: string;
}


export interface PTokenCheckRefresh {
  stringToken: string;
  refreshToken: string;
}

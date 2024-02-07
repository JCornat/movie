import { ResolveFn, Route } from '@angular/router';
import { getConfig } from '@shared/config/config.provider';

function getTitle(subTitle?: string): ResolveFn<string> {
  return () => {
    const title = getConfig('TITLE');
    if (!subTitle) {
      return title;
    }

    return title + ' - ' + subTitle;
  };
}

export default [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    title: getTitle(),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    title: getTitle(),
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then((m) => m.LogoutComponent),
    title: getTitle(),
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
    title: getTitle('Games'),
  },
  {
    path: 'movie',
    loadComponent: () => import('./movie/movie.component').then((m) => m.MovieComponent),
    title: getTitle('Movies'),
  },
  {
    path: 'serie',
    loadComponent: () => import('./serie/serie.component').then((m) => m.SerieComponent),
    title: getTitle('Series'),
  },
] as Route[];

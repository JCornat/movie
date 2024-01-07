import { Route } from '@angular/router';
import * as Config from '@shared/config/config';

export default [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then((m) => m.LogoutComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
    title: `${Config.TITLE} - Games`,
  },
  {
    path: 'movie',
    loadComponent: () => import('./movie/movie.component').then((m) => m.MovieComponent),
    title: `${Config.TITLE} - Movies`,
  },
  {
    path: 'serie',
    loadComponent: () => import('./serie/serie.component').then((m) => m.SerieComponent),
    title: `${Config.TITLE} - Series`,
  },
] as Route[];

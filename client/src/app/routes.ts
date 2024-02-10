import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then((m) => m.LogoutComponent),
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
    title: 'Games',
  },
  {
    path: 'movie',
    loadComponent: () => import('./movie/movie.component').then((m) => m.MovieComponent),
    title: 'Movies',
  },
  {
    path: 'serie',
    loadComponent: () => import('./serie/serie.component').then((m) => m.SerieComponent),
    title: 'Series',
  },
] as Route[];

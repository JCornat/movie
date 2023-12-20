import { Route, Routes } from '@angular/router';
import * as Config from '@shared/config/config';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent),
    title: `${Config.TITLE}`,
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then(m => m.GameComponent),
    loadChildren: () => import('./game/routes'),
    title: `${Config.TITLE} - Games`,
  },
  {
    path: 'movie',
    loadComponent: () => import ('./movie/movie.component').then(m => m.MovieComponent),
    loadChildren: () => import('./movie/routes'),
    title: `${Config.TITLE} - Movies`,
  },
  {
    path: 'serie',
    loadComponent: () => import ('./serie/serie.component').then(m => m.SerieComponent),
    loadChildren: () => import('./serie/routes'),
    title: `${Config.TITLE} - Series`,
  },
];

export default routes;

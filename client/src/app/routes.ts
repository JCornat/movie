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
    loadChildren: () => import('./game/routes'),
    title: `${Config.TITLE} - Games`,
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/routes'),
    title: `${Config.TITLE} - Movies`,
  },
  {
    path: 'serie',
    loadChildren: () => import('./serie/routes'),
    title: `${Config.TITLE} - Series`,
  },
] as Route[];

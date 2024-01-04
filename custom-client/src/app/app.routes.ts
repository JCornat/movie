import { Routes } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/typedef
export const Route = {
  home: 'home',
  login: 'login',
  movies: 'movies',
} as const;

export const routes: Routes = [
  { path: Route.home, loadComponent: () => import('./core/pages/home/home.component').then((m) => m.HomeComponent) },
  {
    path: Route.login,
    loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: Route.movies,
    loadChildren: () => import('./modules/movies/movie.routes').then((m) => m.movieRoutes),
  },
  { path: '**', pathMatch: 'full', redirectTo: Route.home },
];

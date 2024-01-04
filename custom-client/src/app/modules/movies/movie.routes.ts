import { Routes } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/typedef
export const MovieRoute = {
  list: 'list',
} as const;

export const movieRoutes: Routes = [
  { path: MovieRoute.list, loadComponent: () => import('./pages/show-movie/show-movie.component').then((m) => m.ShowMovieComponent) },
  { path: '**', pathMatch: 'full', redirectTo: MovieRoute.list },
];

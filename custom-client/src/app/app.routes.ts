import { Routes } from '@angular/router';

export const Route = {
  home: 'home',
  login: 'login',
} as const;

export const routes: Routes = [
  { path: Route.home, loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  {
    path: Route.login,
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', pathMatch: 'full', redirectTo: Route.home },
];

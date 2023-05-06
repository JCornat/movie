import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'game',
    loadChildren: () => import('./game/routes').then(m => m.GAME_ROUTES),
    title: `${Config.TITLE} - Games`,
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/routes').then(m => m.MOVIE_ROUTES),
    title: `${Config.TITLE} - Movies`,
  },
  {
    path: 'serie',
    loadChildren: () => import('./serie/routes').then(m => m.SERIE_ROUTES),
    title: `${Config.TITLE} - Series`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

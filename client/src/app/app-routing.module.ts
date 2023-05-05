import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'game',
    title: 'Games',
    loadChildren: () => import('./game/routes').then(m => m.GAME_ROUTES)
  },
  {
    path: 'movie',
    title: 'Movies',
    loadChildren: () => import('./movie/routes').then(m => m.MOVIE_ROUTES)
  },
  {
    path: 'serie',
    title: 'Series',
    loadChildren: () => import('./serie/routes').then(m => m.SERIE_ROUTES)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

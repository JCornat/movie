import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/login/login.component';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'game',
    title: 'Games',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'movie',
    title: 'Movies',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'serie',
    title: 'Series',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

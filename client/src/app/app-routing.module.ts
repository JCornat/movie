import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieAddComponent } from './movie/add/add.component';
import { MovieUpdateComponent } from './movie/update/update.component';
import { MovieSearchComponent } from './movie/search/search.component';
import { MovieImportComponent } from './movie/import/import.component';
import { LoginComponent } from './login/login.component';
import { SerieComponent } from './serie/serie.component';
import { SerieAddComponent } from './serie/add/add.component';
import { SerieUpdateComponent } from './serie/update/update.component';
import { SerieImportComponent } from './serie/import/import.component';
import { SerieSearchComponent } from './serie/search/search.component';
import { GameAddComponent } from './game/add/add.component';
import { GameComponent } from './game/game.component';
import { GameUpdateComponent } from './game/update/update.component';
import { GameImportComponent } from './game/import/import.component';
import { GameSearchComponent } from './game/search/search.component';
import { HomeComponent } from './home/home.component';

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
    path: 'movie',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MovieComponent,
      },
      {
        path: 'add',
        component: MovieAddComponent,
      },
      {
        path: 'update/:id',
        component: MovieUpdateComponent,
      },
      {
        path: 'import/:id',
        component: MovieImportComponent,
      },
      {
        path: 'search',
        component: MovieSearchComponent,
      },
    ],
  },
  {
    path: 'serie',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SerieComponent,
      },
      {
        path: 'add',
        component: SerieAddComponent,
      },
      {
        path: 'update/:id',
        component: SerieUpdateComponent,
      },
      {
        path: 'import/:id',
        component: SerieImportComponent,
      },
      {
        path: 'search',
        component: SerieSearchComponent,
      },
    ],
  },
  {
    path: 'game',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GameComponent,
      },
      {
        path: 'add',
        component: GameAddComponent,
      },
      {
        path: 'update/:id',
        component: GameUpdateComponent,
      },
      {
        path: 'import/:id',
        component: GameImportComponent,
      },
      {
        path: 'search',
        component: GameSearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

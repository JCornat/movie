import { Route } from '@angular/router';

import { GameAddComponent } from '@app/administration/game/add/add.component';
import { GameSearchComponent } from '@app/administration/game/search/search.component';
import { GameUpdateComponent } from '@app/administration/game/update/update.component';
import { GameImportComponent } from '@app/administration/game/import/import.component';
import { MovieAddComponent } from '@app/administration/movie/add/add.component';
import { MovieSearchComponent } from '@app/administration/movie/search/search.component';
import { MovieUpdateComponent } from '@app/administration/movie/update/update.component';
import { MovieImportComponent } from '@app/administration/movie/import/import.component';
import { SerieAddComponent } from '@app/administration/serie/add/add.component';
import { SerieSearchComponent } from '@app/administration/serie/search/search.component';
import { SerieUpdateComponent } from '@app/administration/serie/update/update.component';
import { SerieImportComponent } from '@app/administration/serie/import/import.component';

export default [
  {
    path: 'game',
    children: [
      {
        path: 'add',
        component: GameAddComponent,
      },
      {
        path: 'search',
        component: GameSearchComponent,
      },
      {
        path: ':id/update',
        component: GameUpdateComponent,
      },
      {
        path: ':importId/import',
        component: GameImportComponent,
      },
    ]
  },
  {
    path: 'movie',
    children: [
      {
        path: 'add',
        component: MovieAddComponent,
      },
      {
        path: 'search',
        component: MovieSearchComponent,
      },
      {
        path: ':id/update',
        component: MovieUpdateComponent,
      },
      {
        path: ':importId/import',
        component: MovieImportComponent,
      },
    ]
  },
  {
    path: 'serie',
    children: [
      {
        path: 'add',
        component: SerieAddComponent,
      },
      {
        path: 'search',
        component: SerieSearchComponent,
      },
      {
        path: ':id/update',
        component: SerieUpdateComponent,
      },
      {
        path: ':importId/import',
        component: SerieImportComponent,
      },
    ]
  },
] as Route[];

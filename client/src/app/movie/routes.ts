import { Route } from '@angular/router';
import { MovieUpdateComponent } from '@app/movie/update/update.component';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { MovieComponent } from '@app/movie/movie.component';
import { MovieSearchComponent } from '@app/movie/search/search.component';
import { MovieImportComponent } from '@app/movie/import/import.component';

export default [
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
] as Route[];

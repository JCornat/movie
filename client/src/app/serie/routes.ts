import { Route, Routes } from '@angular/router';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { SerieImportComponent } from '@app/serie/import/import.component';
import { SerieSearchComponent } from '@app/serie/search/search.component';

export default [
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
] as Route[];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { SerieComponent } from '@app/serie/serie.component';
import { SerieImportComponent } from '@app/serie/import/import.component';

const routes: Routes = [
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
    path: ':id/update',
    component: SerieUpdateComponent,
  },
  {
    path: ':id/import',
    component: SerieImportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerieRoutingModule {
  //
}

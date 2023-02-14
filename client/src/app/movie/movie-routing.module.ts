import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieUpdateComponent } from '@app/movie/update/update.component';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { MovieComponent } from '@app/movie/movie.component';
import { MovieImportComponent } from '@app/movie/import/import.component';

const routes: Routes = [
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
    path: ':id/update',
    component: MovieUpdateComponent,
  },
  {
    path: ':id/import',
    component: MovieImportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
  //
}
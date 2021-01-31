import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieAddComponent } from './movie/add/add.component';
import { MovieUpdateComponent } from './movie/update/update.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

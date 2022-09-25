import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { MovieImportComponent } from '@app/movie/import/import.component';
import { MovieItemComponent } from '@app/movie/item/item.component';
import { MovieUpdateComponent } from '@app/movie/update/update.component';
import { MovieSearchComponent } from '@app/movie/search/search.component';
import { MovieComponent } from '@app/movie/movie.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieAddComponent,
    MovieImportComponent,
    MovieItemComponent,
    MovieSearchComponent,
    MovieUpdateComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MovieModule {
  //
}

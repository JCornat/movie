import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MovieAddComponent } from '@app/movie/add/add.component';
import { MovieImportComponent } from '@app/movie/import/import.component';
import { MovieUpdateComponent } from '@app/movie/update/update.component';
import { MovieComponent } from '@app/movie/movie.component';
import { MediaModule } from '@app/media/media.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieRoutingModule } from '@app/movie/movie-routing.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieAddComponent,
    MovieImportComponent,
    MovieUpdateComponent,
  ],
  imports: [
    MediaModule,
    CommonModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    NgOptimizedImage,
  ],
})
export class MovieModule {
  //
}

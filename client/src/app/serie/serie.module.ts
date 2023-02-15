import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { SerieImportComponent } from '@app/serie/import/import.component';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SerieComponent } from '@app/serie/serie.component';
import { MediaModule } from '@app/media/media.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SerieRoutingModule } from '@app/serie/serie-routing.module';
import { SerieSearchComponent } from '@app/serie/search/search.component';

@NgModule({
  declarations: [
    SerieComponent,
    SerieAddComponent,
    SerieImportComponent,
    SerieSearchComponent,
    SerieUpdateComponent,
  ],
  imports: [
    MediaModule,
    CommonModule,
    ReactiveFormsModule,
    SerieRoutingModule,
    NgOptimizedImage,
  ],
})
export class SerieModule {
  //
}

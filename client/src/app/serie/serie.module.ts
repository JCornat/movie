import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieSearchComponent } from '@app/serie/search/search.component';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { SerieImportComponent } from '@app/serie/import/import.component';
import { SerieItemComponent } from '@app/serie/item/item.component';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SerieComponent } from '@app/serie/serie.component';

@NgModule({
  declarations: [
    SerieComponent,
    SerieAddComponent,
    SerieImportComponent,
    SerieItemComponent,
    SerieSearchComponent,
    SerieUpdateComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SerieModule {
  //
}

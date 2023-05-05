import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { MediaItemComponent } from '@app/media/item/item.component';

@NgModule({
  exports: [
    MediaItemComponent,
  ],
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
  ],
})
export class MediaModule {
  //
}

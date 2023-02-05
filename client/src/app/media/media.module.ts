import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaItemComponent } from "@app/media/item/item.component";

@NgModule({
  declarations: [
    MediaItemComponent,
  ],
  exports: [
    MediaItemComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
})
export class MediaModule { }

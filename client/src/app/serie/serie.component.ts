import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';
import { CategoryComponent } from '@app/category/category.component';
import { MediaFilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Serie } from '@app/interface';
import { MediaListComponent } from '@app/media/list/list.component';
import { SerieSearchComponent } from '@app/serie/search/search.component';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-serie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    SharedModule,
    MediaItemComponent,
    NgOptimizedImage,
    RouterModule,
    CategoryComponent,
    MediaFilterComponent,
    MediaMoreComponent,
    MediaListComponent,
  ],
})
export class SerieComponent extends MediaComponent {
  override media!: Serie[];
  override mediaService = inject(SerieService);

  override getSearchComponent(): any {
    return SerieSearchComponent;
  }

  override getAddComponent(): any {
    return SerieAddComponent;
  }

  override getUpdateComponent(): any {
    return SerieUpdateComponent;
  }
}

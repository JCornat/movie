import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { CategoryComponent } from '@app/category/category.component';
import { MediaFilterComponent } from '@app/media/filter/filter.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { Serie } from '@app/interface';
import { MediaListComponent } from '@app/media/list/list.component';
import { SerieSearchComponent } from '@app/serie/search/search.component';
import { SerieUpdateComponent } from '@app/serie/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SerieComponent extends MediaComponent<Serie> {
  override media!: Serie[];
  override mediaService = inject(SerieService);

  override getSearchComponent(): any {
    return SerieSearchComponent;
  }

  override getUpdateComponent(): any {
    return SerieUpdateComponent;
  }
}

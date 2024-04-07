import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieImportComponent } from '@app/serie/import/import.component';
import { SerieAddComponent } from '@app/serie/add/add.component';
import { Serie } from '@app/interface';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieSearchComponent extends MediaSearchComponent<Serie> {
  mediaService = inject(SerieService);

  override getImportComponent(): any {
    return SerieImportComponent;
  }

  override getAddComponent(): any {
    return SerieAddComponent;
  }
}

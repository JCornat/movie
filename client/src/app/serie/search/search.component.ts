import { Component, inject } from '@angular/core';

import { MediaSearchComponent } from '@app/media/search/search.component';
import { SerieService } from '@app/serie/serie.service';
import { FormInputDirective } from '@shared/form-input/form-input.directive';
import { SharedModule } from '@shared/shared.module';
import { MediaItemComponent } from '@app/media/item/item.component';

@Component({
  selector: 'serie-search',
  templateUrl: '../../media/search/search.component.html',
  standalone: true,
  imports: [SharedModule, MediaItemComponent],
})
export class SerieSearchComponent extends MediaSearchComponent {
  mediaService = inject(SerieService);
}

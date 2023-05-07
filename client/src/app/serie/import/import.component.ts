import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaImportComponent } from '@app/media/import/import.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-import',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
  ],
})
export class SerieImportComponent extends MediaImportComponent implements OnInit {
  mediaService = inject(SerieService);
}

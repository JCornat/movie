import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaAddComponent } from '@app/media/add/add.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MovieService } from '@app/movie/movie.service';

@Component({
  selector: 'media-add',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [CommonModule, MediaItemComponent, ReactiveFormsModule],
})
export class MovieAddComponent extends MediaAddComponent {
  mediaService = inject(MovieService);
}

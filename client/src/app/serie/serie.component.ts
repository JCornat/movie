import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { MediaComponent } from '@app/media/media.component';
import { MediaItemComponent } from '@app/media/item/item.component';
import { ScreenService } from '@shared/screen/screen.service';
import { Serie } from '@app/serie/serie';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: '../media/media.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class SerieComponent extends MediaComponent {
  public override media!: Serie[];

  constructor(
    public override authenticationService: AuthenticationService,
    public serieService: SerieService,
    public override router: Router,
    public override screenService: ScreenService,
  ) {
    super(authenticationService, router, screenService);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullAll(): Promise<void> {
    this.media = await this.serieService.pullAll();
    this.shuffle(this.media);

    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaUpdateComponent } from '@app/media/update/update.component';
import { RequestService } from '@shared/request/request.service';
import { Serie } from '@app/serie/serie';
import { SerieService } from '@app/serie/serie.service';

@Component({
  selector: 'serie-update',
  templateUrl: '../../media/add/add.component.html',
  styleUrls: ['../../media/add/add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MediaItemComponent,
    ReactiveFormsModule,
  ],
})
export class SerieUpdateComponent extends MediaUpdateComponent {
  constructor(
    public override requestService: RequestService,
    public override router: Router,
    public override route: ActivatedRoute,
    public serieService: SerieService,
  ) {
    super(requestService, route, router);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async pullOne(id: string): Promise<Serie> {
    return this.serieService.pullOne(this.id);
  }

  public override async remove(): Promise<void> {
    await this.serieService.delete(this.id);
    this.navigateBack();
  }

  public async update(data: { [key: string]: any }): Promise<void> {
    await this.serieService.update(data);
  }
}

import { Component } from '@angular/core';
import { SerieService } from './serie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from './serie';
import { ScreenService } from '@shared/screen/screen.service';
import { MediaComponent } from "@app/media/media.component";
// import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-serie',
  templateUrl: '../media/media.component.html',
})
export class SerieComponent extends MediaComponent {
  public override media!: Serie[];

  constructor(
    // public authenticationService: AuthenticationService,
    public serieService: SerieService,
    public override router: Router,
    public override screenService: ScreenService,
  ) {
    super(router, screenService);
  }

  public async pullAll(): Promise<void> {
    this.media = await this.serieService.pullAll();
    this.categories = this.processCategories(this.media);
    this.processDisplayList();
  }

  public override navigateUpdate(serie: Serie): void {
    if (!this.isLogged) {
      return;
    }

    this.router.navigate(['/serie', serie.id, 'update']);
  }
}

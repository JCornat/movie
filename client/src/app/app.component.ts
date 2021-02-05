import { Component } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { ScreenService } from './screen/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie';

  constructor(
    private themeService: ThemeService,
    private screenService: ScreenService,
  ) {
    this.themeService.init();
    this.screenService.init();
  }
}

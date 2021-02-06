import { Component } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { ScreenService } from './screen/screen.service';
import { TokenService } from './token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie';

  constructor(
    private screenService: ScreenService,
    private themeService: ThemeService,
    private tokenService: TokenService,
  ) {
    this.screenService.init();
    this.themeService.init();
    this.tokenService.init();
  }
}

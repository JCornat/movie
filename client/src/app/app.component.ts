import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ThemeService } from '@shared/theme/theme.service';
import { RouterModule } from '@angular/router';
import { PanelComponent } from '@app/panel/panel.component';
import { APP_CONFIG } from '@shared/config/config.provider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, PanelComponent],
  template: `
    <app-panel/>
    <router-outlet/>
  `,
})
export class AppComponent implements OnInit {
  themeService = inject(ThemeService);
  metaTagService = inject(Meta);
  config = inject(APP_CONFIG);

  ngOnInit(): void {
    this.themeService.init();
    this.metaTagService.addTags(this.config.META_TAGS);
  }
}

import { Component, inject, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { PanelService } from '@app/panel/panel.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
  panelService = inject(PanelService);

  display = this.panelService.display;

  @ViewChild('dialogContainer', { read: ViewContainerRef }) container: ViewContainerRef;
}

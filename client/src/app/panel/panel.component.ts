import { Component, inject } from '@angular/core';
import { PanelService } from '@app/panel/panel.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
  panelService = inject(PanelService);

  component = this.panelService.component;

  preventDefault(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  close(event?: Event): void {
    if (event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.panelService.close();
  }
}

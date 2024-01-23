import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PanelService } from '@app/panel/panel.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgComponentOutlet],
})
export class PanelComponent {
  panelService = inject(PanelService);

  component = this.panelService.component;

  preventDefault(event?: Event): void {
    if (event instanceof Event) {
      event.stopPropagation();
    }
  }

  close(event?: Event): void {
    if (event instanceof Event) {
      event.stopPropagation();
    }

    this.panelService.close();
  }
}

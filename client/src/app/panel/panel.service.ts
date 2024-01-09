import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  display = signal(false);
}

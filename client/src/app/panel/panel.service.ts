import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  #component = signal<{ component: any, inputs?: Record<string, any> } | null>(null);
  component = this.#component.asReadonly();

  close() {
    this.#component.set(null);
  }

  open(options: { component: any, inputs?: Record<string, any> }) {
    this.#component.set(options);
  }
}

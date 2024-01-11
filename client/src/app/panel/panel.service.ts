import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  #component: WritableSignal<{ component: any, inputs?: Record<string, any> } | null> = signal(null);
  component = this.#component.asReadonly();

  close() {
    this.#component.set(null);
  }

  open(options: { component: any, inputs?: Record<string, any> }) {
    this.#component.set(options);
  }
}

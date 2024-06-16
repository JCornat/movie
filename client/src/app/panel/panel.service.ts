import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  readonly #component = signal<{ component: any, inputs?: Record<string, any> } | null>(null);
  readonly component = this.#component.asReadonly();

  //region Method
  close() {
    this.#component.set(null);
  }

  open(options: { component: any, inputs?: Record<string, any> }) {
    this.#component.set(options);
  }
  //endregion
}

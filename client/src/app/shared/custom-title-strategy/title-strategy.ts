import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { inject, Injectable, Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getConfig } from '@shared/config/config.provider';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
  #appTitle = getConfig('TITLE');
  #title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    const res = (title) ? `${this.#appTitle} - ${title}` : this.#appTitle;
    this.#title.setTitle(res);
  }
}

export function provideCustomTitleStrategy(): Provider {
  return { provide: TitleStrategy, useClass: CustomTitleStrategy };
}

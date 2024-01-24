import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SharedIconService {
  httpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  icons = signal<Record<string, SafeHtml>>({});

  load(name: string) {
    if (this.icons()[name]) {
      return;
    }

    this.httpClient.get(`assets/images/svg/${name}.svg`, { responseType: 'text' })
      .subscribe((rawHtml) => {
        this.icons.update((value) => {
          const html = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
          return {
            ...value,
            [name]: html,
          };
        });
      });
  }
}

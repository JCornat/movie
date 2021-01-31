import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SharedFieldComponent } from '../../field/field.component';
import { DynamicFormService } from '../../dynamic-form/dynamic-form.service';

@Component({
  selector: 'field-video-youtube',
  templateUrl: './video-youtube.component.html',
})
export class FieldVideoYoutubeComponent extends SharedFieldComponent implements OnInit {
  public isValid: boolean;
  public url: SafeResourceUrl;

  constructor(
    public dynamicFormService: DynamicFormService,
    public sanitizer: DomSanitizer,
  ) {
    super(dynamicFormService);
  }

  public ngOnInit(): void {
    const regex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^?&"'>]+)/;
    const match = this.question.content.match(regex); // TODO CORRECT THIS

    if (match && match[1]) {
      const code = `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(code);
      this.isValid = true;
    }
  }
}

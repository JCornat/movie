import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { authentificationRequired } from '@shared/authentication-required.context';

@Injectable({
  providedIn: 'root',
})
export class UploadApiService {
  private readonly http: HttpClient = inject(HttpClient);

  uploadFile(file: File): Observable<string> {
    const form = new FormData();
    form.append('uploads[]', file, file.name);
    return this.http.post<string>(
      'api/file',
      form,
      { context: authentificationRequired() },
    );
  }
}

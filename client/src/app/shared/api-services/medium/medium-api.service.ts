import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ImportMedia, MediaType, Medium } from '@app/interface';
import { map, Observable } from 'rxjs';

export abstract class MediumApiService<T extends Medium> {
  protected readonly abstract resourceName: Readonly<MediaType>;

  protected readonly http: HttpClient = inject(HttpClient);

  protected get baseUrl(): string {
    return `api/${this.resourceName}`;
  }

  search(title: string): Observable<ImportMedia[]> {
    return this.http.get<ImportMedia[]>(`${this.baseUrl}`, { params: { search: title } });
  }

  importOne(id: string): Observable<ImportMedia> {
    return this.http.get<ImportMedia>(`${this.baseUrl}/${id}/import`);
  }

  pullOne(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`).pipe(
      map((medium: T) => this.setImageUrls(medium)),
    );
  }

  pullAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(
      map((media: T[]) => media.map((medium: T) => this.setImageUrls(medium))),
    );
  }

  updateOne(partial: Partial<T> & { id: string }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${partial.id}`, partial);
  }

  add(partial: Partial<T>): Observable<void> {
    return this.http.post<void>(this.baseUrl, partial);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  protected setImageUrls(medium: T): T {
    medium.url = `image/${medium.id}.jpg`;
    medium.urlWebp = `image/${medium.id}.webp`;
    return medium;
  }
}

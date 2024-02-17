import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ImportMedia, MediaType, Medium } from '@app/interface';
import { map, Observable } from 'rxjs';
import { authentificationRequired } from '@shared/authentication-required.context';
import { getConfig } from '@shared/config/config.provider';

function getImageUrl(): string {
  return getConfig('SERVER_URL') + '/image';
}

export abstract class MediumApiService<T extends Medium> {
  protected readonly abstract resourceName: Readonly<MediaType>;
  protected readonly imageUrl = getImageUrl();

  protected readonly http: HttpClient = inject(HttpClient);

  protected get baseUrl(): string {
    return `api/${this.resourceName}`;
  }

  search(title: string): Observable<ImportMedia[]> {
    return this.http.get<{ data: ImportMedia[] }>(`${this.baseUrl}`, { params: { search: title }, context: authentificationRequired() }).pipe(
      map(({ data }) => data),
    );
  }

  importOne(id: string): Observable<ImportMedia> {
    return this.http.get<{ data: ImportMedia }>(`${this.baseUrl}/${id}/import`, {
      context: authentificationRequired(),
    }).pipe(
      map(({ data }) => data),
    );
  }

  pullOne(id: string): Observable<T> {
    return this.http.get<{ data: T }>(`${this.baseUrl}/${id}`, { context: authentificationRequired() }).pipe(
      map(({ data }) => this.setImageUrls(data)),
    );
  }

  pullAll(): Observable<T[]> {
    return this.http.get<{ data: T[] }>(this.baseUrl).pipe(
      map((media: { data: T[] }) => media.data.map((medium: T) => this.setImageUrls(medium))),
    );
  }

  updateOne(partial: Partial<T> & { id: string }): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${partial.id}`, partial, {
      context: authentificationRequired(),
    });
  }

  add(partial: Partial<T>): Observable<void> {
    return this.http.post<void>(this.baseUrl, partial, {
      context: authentificationRequired(),
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      context: authentificationRequired(),
    });
  }

  protected setImageUrls(medium: T): T {
    medium.url = `${this.imageUrl}/${medium.id}.jpg`;
    medium.urlWebp = `${this.imageUrl}/${medium.id}.webp`;
    return medium;
  }
}

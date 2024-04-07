import { Directive, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { ImportMedia, Medium } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';
import { CategoryService } from '@app/category/category.service';
import { MediaService } from '@app/media/media.service';
import { HttpErrorResponse } from '@angular/common/http';

type SearchFormType = { search: FormControl<string> };

@Directive()
export abstract class MediaSearchComponent<T extends Medium> {
  categoryService = inject(CategoryService);
  router = inject(Router);
  panelService = inject(PanelService);
  abstract mediaService: MediaService<T>;

  searchTerm = input<string>('');

  searchForm = new FormControl('', { nonNullable: true });
  type = this.categoryService.currentCategory;
  searchResults = signal<ImportMedia[] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.subscribeFormData();
    this.buildSearchForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  openImportPanel(value: ImportMedia) {
    const component = this.getImportComponent();
    this.panelService.open({ component, inputs: { importId: value.importId } });
  }

  openAddPanel() {
    const component = this.getAddComponent();
    this.panelService.open({ component });
  }

  search(title: string): Observable<ImportMedia[]> {
    this.error.set(null);

    return this.mediaService.search(title).pipe(
      tap((result) => this.searchResults.set(result)),
      catchError((err: HttpErrorResponse) => {
        this.error.set(err.error);
        return of([]);
      }),
      tap(() => this.loading.set(false)),
    );
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  abstract getImportComponent(): any;

  abstract getAddComponent(): any;

  buildSearchForm(): FormGroup<SearchFormType> {
    const formGroup = new FormGroup<SearchFormType>({
      search: new FormControl('', { nonNullable: true }),
    });

    return formGroup;
  }

  /*-----------------------*\
          Subscribe
  \*-----------------------*/

  subscribeFormData(): void {
    this.searchForm.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      tap(() => this.loading.set(true)),
      switchMap((search) => this.search(search)),
    ).subscribe();
  }
}

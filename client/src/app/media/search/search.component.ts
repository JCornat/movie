import { Directive, inject, input, Signal, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, startWith, tap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import { ImportMedia } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';
import { CategoryService } from '@app/category/category.service';

@Directive()
export abstract class MediaSearchComponent {
  categoryService = inject(CategoryService);
  router = inject(Router);
  panelService = inject(PanelService);
  abstract mediaService: SerieService | MovieService | GameService;

  readonly searchTerm = input<string>('');

  readonly formData = signal<Record<string, any> | null>(null);
  readonly searchForm = this.buildSearchForm();
  readonly type = this.categoryService.currentCategory;
  readonly searchResults = signal<ImportMedia[] | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.subscribeSearchTerm();
    this.subscribeFormData();
    this.subscribeFormChanges();
  }

  //region Template
  openImportPanel(value: ImportMedia) {
    const component = this.getImportComponent();
    this.panelService.open({ component, inputs: { importId: value.importId } });
  }

  openAddPanel() {
    const component = this.getAddComponent();
    this.panelService.open({ component });
  }

  async search(title: string): Promise<void> {
    this.error.set(null);

    try {
      const results = await this.mediaService.search(title);
      this.searchResults.set(results);
    } catch (error) {
      this.error.set((error as any).message);
    } finally {
      this.loading.set(false);
    }
  }
  //endregion

  //region Method
  abstract getImportComponent(): any;

  abstract getAddComponent(): any;

  buildSearchForm(): Signal<FormGroup> {
    const formGroup = new FormGroup({
      search: new FormControl(),
    });

    return signal(formGroup);
  }

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }
  //endregion

  //region Subscribe
  subscribeSearchTerm() {
    toObservable(this.searchTerm).pipe(filter(Boolean)).subscribe((value) => {
      this.searchForm().get('search')?.setValue(value);
    });
  }

  subscribeFormChanges(): void {
    this.searchForm().valueChanges
      .pipe(
        takeUntilDestroyed(),
        startWith({ search: this.searchTerm() }),
      )
      .subscribe((data) => {
        this.onValid(data);
      });
  }

  subscribeFormData(): void {
    toObservable(this.formData)
      .pipe(
        filter((value) => value?.search.length > 2),
        tap((value) => {
          this.loading.set(true);
        }),
        debounceTime(500),
      )
      .subscribe(async (value) => {
        await this.search(value!.search);
      });
  }
  //endregion
}

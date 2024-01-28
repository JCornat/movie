import { Directive, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import { ImportMedia } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';
import { filter, startWith, tap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';
import { CategoryService } from '@app/category/category.service';

@Directive()
export abstract class MediaSearchComponent implements OnInit {
  categoryService = inject(CategoryService);
  router = inject(Router);
  panelService = inject(PanelService);
  abstract mediaService: SerieService | MovieService | GameService;

  searchTerm = input<string>('');

  formData = signal<Record<string, any> | null>(null);
  searchForm = signal<FormGroup | null>(null);
  type = this.categoryService.currentCategory;
  searchResults = signal<ImportMedia[] | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.subscribeFormData();
  }

  ngOnInit(): void {
    this.buildSearchForm();
    this.subscribeFormChanges();
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

  /*-----------------------*\
           Method
  \*-----------------------*/

  abstract getImportComponent(): any;

  abstract getAddComponent(): any;

  buildSearchForm(): void {
    const formGroup = new FormGroup({
      search: new FormControl(this.searchTerm()),
    });

    this.searchForm.set(formGroup);
  }

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }

  /*-----------------------*\
          Subscribe
  \*-----------------------*/

  subscribeFormChanges(): void {
    this.searchForm()!.valueChanges
      .pipe(
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
}

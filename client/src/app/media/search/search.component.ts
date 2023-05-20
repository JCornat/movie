import { Directive, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '@app/game/game.service';
import { ImportMedia } from '@app/media/media';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import * as Global from '@shared/global/global';

@Directive()
export abstract class MediaSearchComponent implements OnInit {
  values!: { [key: string]: any };
  formData!: { [key: string]: any };
  searchForm!: FormGroup;
  type!: 'movie' | 'serie' | 'game';
  searchResults!: ImportMedia[];
  loading!: boolean;
  error!: string;
  router = inject(Router);
  abstract mediaService: SerieService | MovieService | GameService;

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.buildType();
    this.buildForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  async search(title: string): Promise<void> {
    this.error = null as any;
    this.loading = true;

    try {
      this.searchResults = await this.mediaService.search(title);
    } catch (error) {
      this.error = (error as any).message;
    } finally {
      this.loading = false;
    }
  }

  select(result: ImportMedia): void {
    this.navigateImport(result.importId);
  }

  async onSubmit(): Promise<void> {
    if (!this.formData) {
      return;
    }

    this.search(this.formData.search);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateBack(): void {
    console.log('this', this.type);
    this.router.navigate([`/${this.type}`]);
  }

  navigateAdd(): void {
    this.router.navigate([`/administration`, this.type, 'add']);
  }

  navigateImport(importId: string): void {
    this.router.navigate([`/administration`, this.type, importId, 'import']);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  buildType(): void {
    const splitUrl = this.router.url.split('/');
    const type = splitUrl[2]; // Get third item, because it has /administration
    if (Global.isEmpty(type)) {
      throw {status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown`};
    }

    this.type = type as 'movie' | 'serie' | 'game';
  }

  buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}

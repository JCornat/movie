import { Directive, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '@app/game/game.service';
import { MovieService } from '@app/movie/movie.service';
import { SerieService } from '@app/serie/serie.service';
import * as Global from '@shared/global/global';
import { ImportMedia } from '@app/interface';
import { PanelService } from '@app/panel/panel.service';

@Directive()
export abstract class MediaSearchComponent implements OnInit {
  router = inject(Router);
  panelService = inject(PanelService);
  abstract mediaService: SerieService | MovieService | GameService;

  values!: { [key: string]: any };
  formData!: { [key: string]: any };
  searchForm!: FormGroup;
  type!: 'movie' | 'serie' | 'game';
  searchResults!: ImportMedia[];
  loading!: boolean;
  error!: string;

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
    // this.router.navigate([`/${this.type}`]);
    this.panelService.close();
  }

  navigateAdd(): void {
    this.router.navigate([`/${this.type}`, 'add']);
  }

  navigateImport(importId: string): void {
    this.router.navigate([`/${this.type}`, importId, 'import']);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  buildType(): void {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1];
    if (Global.isEmpty(type)) {
      throw { status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown` };
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

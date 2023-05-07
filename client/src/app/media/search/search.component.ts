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
  public values!: { [key: string]: any };
  public formData!: { [key: string]: any };
  public searchForm!: FormGroup;
  public type!: 'movie' | 'serie' | 'game';
  public searchResults!: ImportMedia[];
  public loading!: boolean;
  public error!: string;
  public router = inject(Router);
  public abstract mediaService: SerieService | MovieService | GameService;

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.buildType();
    this.buildForm();
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public async search(title: string): Promise<void> {
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

  public select(result: ImportMedia): void {
    this.navigateImport(result.importId);
  }

  public async onSubmit(): Promise<void> {
    if (!this.formData) {
      return;
    }

    this.search(this.formData.search);
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate([`/${this.type}`]);
  }

  public navigateAdd(): void {
    this.router.navigate([`/${this.type}`, 'add']);
  }

  public navigateImport(importId: string): void {
    this.router.navigate([`/${this.type}`, importId, 'import']);
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public buildType(): void {
    const regex = /^\/(\w+)/;
    const regexResult = regex.exec(this.router.url);
    const type = regexResult?.[1];
    if (Global.isEmpty(type)) {
      throw {status: 400, method: 'MediaSearchComponent.buildType', message: `Type unknown`};
    }

    this.type = type as 'movie' | 'serie' | 'game';
  }

  public buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}

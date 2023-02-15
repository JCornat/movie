import { Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '@shared/global/global';
import { ImportMedia } from '@app/media/media';
import { RequestService } from '@shared/request/request.service';

@Directive()
export abstract class MediaSearchComponent implements OnInit {
  public values!: { [key: string]: any };
  public formData!: { [key: string]: any };
  public searchForm!: FormGroup;
  public type!: 'movie' | 'serie' | 'game';
  public searchResults!: ImportMedia[];
  public loading!: boolean;
  public error!: string;

  constructor(
    public requestService: RequestService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    //
  }

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

  public abstract search(title: string): Promise<void>;

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

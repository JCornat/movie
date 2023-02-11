import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Global from '@shared/global/global';
import { FormControl, FormGroup } from '@angular/forms';

@Directive()
export abstract class MediaAddComponent implements OnInit {
  public loading!: boolean;
  public error!: string | null;

  public questions!: any[];

  public mediaForm!: FormGroup;
  public values!: { [key: string]: any };
  public formData!: { [key: string]: any };
  public type!: 'movie' | 'serie' | 'game';

  constructor(
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

    const values: any['values'] = [
      {value: 'todo', label: 'A voir'},
    ];

    this.questions = [
      {key: '_id', type: 'text', label: 'id', hide: true},
      {key: 'title', type: 'text', label: 'Titre'},
      {key: 'year', type: 'number', label: 'Année'},
      {key: 'url', type: 'text', label: 'URL du Poster'},
      {key: 'backgroundImage', type: 'file', label: 'Poster (300x450)', content: 'http://localhost:3000/api/file'},
      {key: 'rating', type: 'number', label: 'Note'},
      {key: 'tags', type: 'checkbox', label: 'Tags', values},
    ];
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public async onSubmit(): Promise<void> {
    if (this.loading) {
      return;
    }

    this.error = null;
    this.loading = true;

    try {
      await this.add();
      this.navigateBack();
    } catch (error) {
      this.error = error as string;
      this.loading = false;
    }
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public abstract add(): Promise<void>;

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  public navigateBack(): void {
    this.router.navigate([`/${this.type}`]);
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
    this.mediaForm = new FormGroup({
      title: new FormControl(''),
      year: new FormControl(''),
      url: new FormControl(''),
      rating: new FormControl(''),
    });

    this.mediaForm.valueChanges.subscribe((data) => {
      this.onValid(data)
    });
  }
}

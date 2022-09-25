import { Directive, OnInit } from '@angular/core';

@Directive()
export abstract class MediumSearchComponent implements OnInit {
  public questions!: any[];
  public results: { title: string, year: number, backgroundImage: string }[] = [];

  public values!: { [key: string]: any };
  public formData!: { [key: string]: any };

  constructor() {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.questions = [
      {key: 'search', type: 'text', label: 'Titre', required: true, marginBottom: 0},
    ];
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public abstract search(title: string): Promise<void>;

  public select(result: any): void {
    this.navigateImport(result.id);
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

  public abstract navigateBack(): void;

  public abstract navigateAdd(): void;

  public abstract navigateImport(id: string): void;
}

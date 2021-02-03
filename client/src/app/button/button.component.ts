import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import * as Global from '../global/global';

@Component({
  selector: 'c7z-button',
  template: `
    <button type="button" [class]="buttonClass" (click)="buttonClicked($event)" [disabled]="disabled">
      <ng-container *ngIf="loading">
        <i class="icon icon-sync spin"></i>
      </ng-container>

      <ng-container *ngIf="!loading">
        <ng-container *ngIf="iconClass">
          <i [class]="iconClass"></i>
        </ng-container>

        <span #contentWrapper>
          <ng-content></ng-content>
        </span>
      </ng-container>
    </button>
  `,
})
export class C7zButtonComponent implements OnChanges, AfterViewInit {
  @ViewChild('contentWrapper') public contentWrapper;

  // Capture class property, then build classes
  @Input() set class(data: string) {
    this._class = data;
  }

  // Capture ngClass properties, then build classes
  @Input() set ngClass(data: any) {
    this._ngClass = data;
  }

  @Input() set icon(data: string) {
    this._icon = data;
  }

  @Input() set spin(data: boolean) {
    this._spin = data;
  }

  @Input() public disabled?: boolean;
  @Input() public propagation?: boolean;
  @Input() public loading?: boolean;

  @Output() public onClick = new EventEmitter<MouseEvent>();

  public viewInitialized: boolean;
  public _class: string;
  public _ngClass: string;
  public buttonClass: string;

  public _icon: string;
  public _spin: boolean;
  public iconClass: string;

  constructor(
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.init();
  }

  public init(): void {
    this.buttonClass = '';
    this.iconClass = '';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.viewInitialized) {
      return;
    }

    let buildButtonClass = false;
    let buildIconClass = false;

    for (const key of Object.keys(changes)) {
      switch (key) {
        case 'class':
        case 'ngClass':
          buildButtonClass = true;
          break;
        case 'icon':
        case 'spin':
          buildIconClass = true;
          break;
        default:
          console.error('button change not supported', key);
          break;
      }
    }

    if (buildButtonClass) {
      this.buildButtonClass();
    }

    if (buildIconClass) {
      this.buildIconClass();
    }
  }

  public ngAfterViewInit(): void {
    this.buildButtonClass();
    this.buildIconClass();
    this.changeDetectorRef.detectChanges();

    this.viewInitialized = true;
  }

  /*-----------------------*\
           Template
  \*-----------------------*/

  public buttonClicked(event?: MouseEvent): void {
    if (!this.propagation && event instanceof Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.onClick.emit(event);
  }

  /*-----------------------*\
           Process
  \*-----------------------*/

  public buildButtonClass(): void {
    const classes = [
      'c7z-button',
    ];

    if (Global.isPopulated(this._class)) {
      classes.push(this._class);
    }

    if (Global.isPopulated(this._ngClass)) {
      if (typeof this._ngClass === 'string') {
        classes.push(this._ngClass);
      } else if (typeof this._ngClass === 'object') {
        for (const key of Object.keys(this._ngClass)) {
          if (!this._ngClass[key]) {
            continue;
          }

          classes.push(key);
        }
      }
    }

    this.buttonClass = classes.join(' ');
  }

  public buildIconClass(): void {
    const classes = [];

    if (this.contentWrapper && this.contentWrapper.nativeElement.childNodes.length > 0) {
      classes.push('margin-right');
    }

    if (this._icon) {
      classes.push('icon', `icon-${this._icon}`);
    }

    if (this._spin) {
      classes.push('spin');
    }

    this.iconClass = classes.join(' ');
  }
}

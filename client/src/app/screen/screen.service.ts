import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private resizeSubject = new Subject<void>();
  public resizeObservable = this.resizeSubject.asObservable();

  private scrollSubject = new Subject<void>();
  public scrollObservable = this.scrollSubject.asObservable();

  private heightResizeSubject = new Subject<number>();
  public heightResizeObservable = this.heightResizeSubject.asObservable();

  private widthResizeSubject = new Subject<number>();
  public widthResizeObservable = this.widthResizeSubject.asObservable();

  public previousHeight: number;
  public currentHeight: number;

  public previousWidth: number;
  public currentWidth: number;

  public previousScrollTop: number;
  public currentScrollTop: number;

  constructor() {
    this.subscribeResize();

    this.init();
  }

  public init(): void {
    this.currentHeight = 0;
    this.currentWidth = 0;

    this.getCurrentDimensions();
  }

  private getCurrentDimensions(): void {
    this.previousWidth = this.currentWidth;
    this.previousHeight = this.currentHeight;

    this.currentWidth = window.innerWidth;
    this.currentHeight = window.innerHeight;
  }

  private subscribeResize(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(this.onResize.bind(this));
  }

  public onResize(): void {
    this.getCurrentDimensions();

    this.resizeSubject.next();

    if (this.previousHeight !== this.currentHeight) {
      this.heightResizeSubject.next(window.innerWidth);
    }

    if (this.previousWidth !== this.currentWidth) {
      this.widthResizeSubject.next(window.innerWidth);
    }
  }

  public onScroll(scrollTop: number): void {
    this.previousScrollTop = this.currentScrollTop;
    this.currentScrollTop = scrollTop;
    this.scrollSubject.next();
  }

  public isMobile(): boolean {
    return (this.currentWidth < 544);
  }

  public isTablet(): boolean {
    return (this.currentWidth >= 544 && this.currentWidth < 768);
  }

  public isLaptop(): boolean {
    return (this.currentWidth >= 768 && this.currentWidth < 992);
  }

  public isDesktop(): boolean {
    return (this.currentWidth >= 992 && this.currentWidth < 1921);
  }

  public isWidescreen(): boolean {
    return (this.currentWidth >= 1921);
  }
}

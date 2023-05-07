import { Injectable, signal } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private resizeSubject = new Subject<void>();
  resizeObservable = this.resizeSubject.asObservable();

  private scrollSubject = new Subject<void>();
  scrollObservable = this.scrollSubject.asObservable();

  private heightResizeSubject = new Subject<number>();
  heightResizeObservable = this.heightResizeSubject.asObservable();

  private widthResizeSubject = new Subject<number>();
  widthResizeObservable = this.widthResizeSubject.asObservable();
  widthSignal = signal(0);

  previousHeight!: number;
  currentHeight!: number;

  previousWidth!: number;
  currentWidth!: number;

  previousScrollTop!: number;
  currentScrollTop!: number;

  constructor() {
    this.subscribeResize();

    this.init();
  }

  init(): void {
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

  onResize(): void {
    this.getCurrentDimensions();

    this.resizeSubject.next();

    if (this.previousHeight !== this.currentHeight) {
      this.heightResizeSubject.next(window.innerWidth);
    }

    if (this.previousWidth !== this.currentWidth) {
      this.widthResizeSubject.next(window.innerWidth);
      this.widthSignal.set(window.innerWidth);
    }
  }

  onScroll(scrollTop: number): void {
    this.previousScrollTop = this.currentScrollTop;
    this.currentScrollTop = scrollTop;
    this.scrollSubject.next();
  }

  isMobile(): boolean {
    return (this.currentWidth < 544);
  }

  isTablet(): boolean {
    return (this.currentWidth >= 544 && this.currentWidth < 768);
  }

  isLaptop(): boolean {
    return (this.currentWidth >= 768 && this.currentWidth < 992);
  }

  isDesktop(): boolean {
    return (this.currentWidth >= 992 && this.currentWidth < 1921);
  }

  isWidescreen(): boolean {
    return (this.currentWidth >= 1921);
  }
}

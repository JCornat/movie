import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme: string;
  public colorNames: string[];

  constructor() {
    //
  }

  public init(): void {
    this.initializeColorNames();
    this.buildTheme();
  }

  /*-----------------------*\
           Method
  \*-----------------------*/

  public initializeColorNames(): void {
    this.colorNames = [
      'background',
      'on-background',
      'primary',
      'on-primary',
      'secondary',
      'on-secondary',
      'surface',
      'on-surface',
      'error',
      'on-error',
      'success',
      'on-success',
      'warning',
      'on-warning',
      'link',
      'navbar',
      'on-navbar',
      'on-navbar-primary',
      'admission',
      'on-admission',
      'operation',
      'on-operation',
      'exit',
      'on-exit',
    ];
  }

  public buildTheme(): void {
    let theme = 'dark';
    let customColors = null;

    this.setTheme(theme, customColors);
  }

  public setTheme(theme: string, customColors?: { [key: string]: string }, options: { convertToRgb?: boolean } = {}): void {
    if (!theme) {
      return;
    }

    switch (theme) {
      case 'light':
        this.currentTheme = theme;
        this.setLightTheme();
        break;
      case 'dark':
        this.currentTheme = theme;
        this.setDarkTheme();
        break;
      case 'custom':
        this.currentTheme = theme;
        this.applyColors(customColors, options);
        break;
      default:
        this.currentTheme = 'light';
        this.setLightTheme();
        break;
    }
  }

  public setLightTheme() {
    const color = {
      'background': '#eceff1',
      'on-background': '#000000',
      'primary': '#2979ff',
      'on-primary': '#ffffff',
      'secondary': '#3f51b5',
      'on-secondary': '#000000',
      'surface': '#fafafa',
      'on-surface': '#000000',
      'error': '#cf6679',
      'on-error': '#000000',
      'success': '#4caf50',
      'on-success': '#000000',
      'warning': '#ff9800',
      'on-warning': '#000000',
      'link': '#1976d2',
      'navbar': '#19212b',
      'on-navbar': '#ffffff',
      'on-navbar-primary': '#4fc3f7',
      'admission': '#9C27B0',
      'on-admission': '#ffffff',
      'operation': '#F44336',
      'on-operation': '#ffffff',
      'exit': '#4CAF50',
      'on-exit': '#ffffff',
    };

    this.applyColors(color, {convertToRgb: true});
  }

  public setDarkTheme() {
    const color = {
      'background': '#121212',
      'on-background': '#ffffff',
      'primary': '#0043b3',
      'on-primary': '#ffffff',
      'secondary': '#03dac6',
      'on-secondary': '#ffffff',
      'surface': '#1d1d1d',
      'on-surface': '#ffffff',
      'error': '#cf6679',
      'on-error': '#ffffff',
      'success': '#4caf50',
      'on-success': '#ffffff',
      'warning': '#ff9800',
      'on-warning': '#ffffff',
      'link': '#1976d2',
      'navbar': '#19212b',
      'on-navbar': '#ffffff',
      'on-navbar-primary': '#4fc3f7',
      'admission': '#9C27B0',
      'on-admission': '#ffffff',
      'operation': '#F44336',
      'on-operation': '#ffffff',
      'exit': '#4CAF50',
      'on-exit': '#ffffff',
    };

    this.applyColors(color, {convertToRgb: true});
  }

  public applyColors(data: any, options: { convertToRgb?: boolean } = {}): void {
    for (const colorName of this.colorNames) {
      let value = data[colorName];
      if (options.convertToRgb) {
        value = this.hexToRgb(value);
      }

      document.documentElement.style.setProperty(`--${colorName}`, value);
    }
  }

  public getColors(options: { convertToHex?: boolean } = {}): { [key: string]: string } {
    const res = {};

    for (const colorName of this.colorNames) {
      const value = document.documentElement.style.getPropertyValue(`--${colorName}`);
      if (options.convertToHex) {
        const [red, blue, green] = value.split(',');
        res[colorName] = this.rgbToHex(red, blue, green);
      } else {
        res[colorName] = value;
      }
    }

    return res;
  }

  public rgbToHex(red: string, green: string, blue: string): string {
    let hexRed = (+red.trim()).toString(16);
    let hexGreen = (+green.trim()).toString(16);
    let hexBlue = (+blue.trim()).toString(16);

    if (hexRed.length === 1) {
      hexRed = `0${hexRed}`;
    }

    if (hexGreen.length === 1) {
      hexGreen = `0${hexGreen}`;
    }

    if (hexBlue.length === 1) {
      hexBlue = `0${hexBlue}`;
    }

    return `#${hexRed}${hexGreen}${hexBlue}`;
  }

  public hexToRgb(value: string): string {
    let red = 0;
    let green = 0;
    let blue = 0;

    if (value.length === 4) {
      red = +`0x${value[1]}${value[1]}`;
      green = +`0x${value[2]}${value[2]}`;
      blue = +`0x${value[3]}${value[3]}`;
    } else if (value.length === 7) {
      red = +`0x${value[1]}${value[2]}`;
      green = +`0x${value[3]}${value[4]}`;
      blue = +`0x${value[5]}${value[6]}`;
    }

    return `${red},${green},${blue}`;
  }
}

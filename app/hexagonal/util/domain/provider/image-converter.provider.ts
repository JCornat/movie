export interface ConvertOptions {
  imagePath: string;
  destinationPath: string;
  append?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  density?: number;
  background?: string;
  alpha?: string;
  range?: number;
}

export interface ImageConverterProvider {
  identify(filename: string): Promise<string>;
  convert(options: ConvertOptions): Promise<void>;
  merge(filenames: string[], destinationPath: string): Promise<void>;
}

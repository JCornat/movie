type BufferEncoding =
  'ascii' |
  'utf8' |
  'utf-8' |
  'utf16le' |
  'utf-16le' |
  'ucs2' |
  'ucs-2' |
  'base64' |
  'base64url' |
  'latin1' |
  'binary' |
  'hex';

export interface FileStats {
  size: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
}

export interface FileSystemProvider {
  stat(path: string): Promise<FileStats>;
  copyFile(src: string, dest: string): Promise<void>;
  rename(oldPath: string, newPath: string): Promise<void>;
  unlink(path: string): Promise<void>;
  writeFile(path: string, data: string | Buffer): Promise<void>;
  readFile(path: string): Promise<Buffer>;
  readTextFile(path: string, encoding?: BufferEncoding): Promise<string>;
  readDir(pathDir: string): Promise<string[]>;
  exists(filePath: string): Promise<boolean>;
  updateFileDate(filePath: string): Promise<void>;
}

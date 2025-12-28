import fsPromises from 'node:fs/promises';
import { FileSystemProvider } from '../../domain/provider/file-system.provider';
import { ArgumentNotProvidedException } from '../../exception';

export class FileSystemNodeProvider implements FileSystemProvider {
  stat(path: string) {
    return fsPromises.stat(path);
  }

  copyFile(src: string, dest: string) {
    return fsPromises.copyFile(src, dest);
  }

  rename(oldPath: string, newPath: string) {
    return fsPromises.rename(oldPath, newPath);
  }

  unlink(path: string) {
    return fsPromises.unlink(path);
  }

  writeFile(path: string, data: string | Buffer) {
    return fsPromises.writeFile(path, data);
  }

  readFile(path: string) {
    return fsPromises.readFile(path);
  }

  readTextFile(path: string, encoding: BufferEncoding = 'utf8') {
    if (!encoding) {
      throw new ArgumentNotProvidedException();
    }

    return fsPromises.readFile(path, { encoding });
  }

  readDir(pathDir: string) {
    return fsPromises.readdir(pathDir);
  }

  async exists(filePath: string) {
    try {
      await fsPromises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async updateFileDate(filePath: string): Promise<void> {
    const newDate = new Date();
    await fsPromises.utimes(filePath, newDate, newDate);
  }
}

export const defaultFileSystemProvider = new FileSystemNodeProvider();

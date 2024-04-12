import * as bcrypt from 'bcrypt';

export namespace Encryption {
  export async function hash(data: string): Promise<string> {
    const salt = await generateSalt();
    return await bcrypt.hash(data, salt);
  }

  export async function generateSalt(complexity: number = 10): Promise<string> {
    return await bcrypt.genSalt(complexity);
  }

  export async function compare(password: string, hashString: string): Promise<boolean> {
    return await bcrypt.compare(password, hashString);
  }
}

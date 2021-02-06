import * as bcrypt from 'bcryptjs';

export function hash(data: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const salt = await generateSalt();
    bcrypt.hash(data, salt, (error, hashString) => {
      if (error) {
        return reject(error);
      }

      resolve(hashString);
    });
  });
}

export function generateSalt(complexity: number = 10): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(complexity, (error, salt) => {
      if (error) {
        return reject(error);
      }

      resolve(salt);
    });
  });
}

export function compare(password: string, hashString: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashString, (error, isMatch) => {
      if (error) {
        return reject(error);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
}

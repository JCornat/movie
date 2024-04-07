import { Global } from './global.ts';

export namespace Random {
  export function generate(options: { count?: number, disableLowerCase?: boolean, disableNumbers?: boolean, disableUpperCase?: boolean } = {}): string {
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseCharacters = lowerCaseCharacters.toUpperCase();
    const numberCharacters = '0123456789';

    let possibleCharacters = '';
    if (Global.isEmpty(options.disableLowerCase)) {
      possibleCharacters += lowerCaseCharacters;
    }

    if (Global.isEmpty(options.disableNumbers)) {
      possibleCharacters += numberCharacters;
    }

    if (Global.isEmpty(options.disableUpperCase)) {
      possibleCharacters += upperCaseCharacters;
    }

    const count = (Global.isNaN(options.count)) ? 5 : options.count;
    const array = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * possibleCharacters.length);
      const character = possibleCharacters.charAt(randomNumber);
      array.push(character);
    }

    return array.join('');
  }
}

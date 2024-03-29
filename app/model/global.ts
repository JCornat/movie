export namespace Global {
  /**
   * Capitalize each word from a string
   *
   * Ex: ('lorem ipsum dolor') will return 'Lorem Ipsum Dolor'
   */
  export function capitalize(arg: string): string {
    if (typeof arg !== 'string') {
      throw new Error('Argument type unexpected');
    }

    if (!arg || !arg.trim()) {
      return '';
    }

    const text = arg.trim()
      .toLowerCase()
      .replace(/\b(\w)/g, (letter) => {
        return letter.toUpperCase();
      });

    return text;
  }

  /**
   * Extract from object its property value, to return an array of these values
   * Property can be an array, and will search nested value
   * This function will return an array of unique values
   *
   * Ex: For data = [{a: 1}, {a: 2}] and property = 'a', this will return [1, 2]
   * Ex: For data = [{a: 1}, {a: 1}] and property = 'a', this will return [1]
   * Ex: For data = [{a: 1}, {b: 2}] and property = 'a', this will return [1]
   * Ex: For data = [{a: {b: {c: 'hello'}}}] and property = ['a', 'b', 'c'], this will return ['hello']
   */
  export function extract(data: any[], property: string | number | string[] | number[]): any[] {
    if (!data || Global.isEmpty(data)) {
      return [];
    }

    const res = {};
    for (const item of data) {
      if (Array.isArray(property)) {
        if (Global.isEmpty(item)) {
          continue;
        }

        let value = item;
        for (let i = 0; i < property.length; i++) {
          const tmp = property[i];

          value = value[tmp];
          if (Global.isEmpty(value)) {
            continue;
          }

          if (i === property.length - 1) {
            res[value] = value;
          }
        }
      } else {
        const value = item[property];
        if (Global.isEmpty(value)) {
          continue;
        }

        res[value] = value;
      }
    }

    return Object.values(res);
  }

  /**
   * Move old properties to new ones
   *
   * Ex: ([{a: 100, b: 200, c:300}], {a: 'aa', b: 'bb'}) will return {aa: 100, bb: 200}
   */
  export function mapping<T = any>(data: any[], property: any): T[] {
    if (!data || Global.isEmpty(data)) {
      return [];
    }

    const res = [];
    for (const item of data) {
      const tmp = {};
      for (const key of Object.keys(property)) {
        if (item[key] === undefined) {
          continue;
        }

        tmp[property[key]] = item[key];
      }

      res.push(tmp);
    }

    return res;
  }

  /**
   * Return true if property is "empty"
   *
   * Ex: ([]) will return true
   * Ex: (null) will return true
   * Ex: (undefined) will return true
   * Ex: ('') will return true
   * Ex: ({}) will return true
   * Ex: ([2, 3]) will return false
   * Ex: ('hello') will return false
   * Ex: ({a: 1}) will return false
   * Ex: (true) will return false
   * Ex: (false) will return false
   * Ex: (2) will return false
   * Ex: (2.1) will return false
   */
  export function isEmpty(arg: any): boolean {
    if (typeof arg === 'undefined') {
      return true;
    } else if (typeof arg === 'string') {
      return (arg) ? !arg.trim() : true;
    } else if (typeof arg === 'number') {
      return Number.isNaN(arg);
    } else if (typeof arg === 'boolean') {
      return false;
    } else if (Array.isArray(arg)) {
      return (!arg || arg.length === 0);
    } else if (arg instanceof Date) {
      return false;
    } else if (arg instanceof Map || arg instanceof Set) {
      return (arg.size === 0);
    } else if (arg && typeof arg === 'object') {
      return (Object.getOwnPropertyNames(arg).length === 0);
    } else if (arg && typeof arg === 'function') {
      return false;
    } else if (arg === null) {
      return true;
    } else {
      console.error('Argument type unexpected', arg, typeof arg);
      throw new Error('Argument type unexpected');
    }
  }

  /**
   * Return true if property is not "empty"
   * Contrary of "isEmpty" function
   */
  export function isPopulated(arg: any): boolean {
    return !Global.isEmpty(arg);
  }

  /**
   * Return if property is NaN, and cast if necessary
   *
   * Ex: ('1') will return false
   * Ex: (2) will return false
   * Ex: (2.1) will return false
   * Ex: (NaN) will return true
   * Ex: ('hello') will return true
   */
  export function isNaN(arg: any): boolean {
    if (typeof arg === 'undefined') {
      return true;
    } else if (typeof arg === 'string') {
      arg = arg.trim();
      if (arg === '') {
        return true;
      }

      return Number.isNaN(+arg);
    } else if (typeof arg === 'number') {
      return Number.isNaN(arg);
    } else if (typeof arg === 'boolean') {
      return true;
    } else if (Array.isArray(arg)) {
      return true;
    } else if (arg instanceof Date) {
      return true;
    } else if (arg && typeof arg === 'object') {
      return true;
    } else if (arg === null) {
      return true;
    } else {
      console.error('Argument type unexpected', arg, typeof arg);
      throw new Error('Argument type unexpected');
    }
  }

  export function isNumber(arg: any): boolean {
    return !Global.isNaN(arg);
  }

  /**
   * Convert an array into object
   * Be careful, result returned contains reference to array items : if you modify item from array or value from object, both will be affected !
   *
   * If multiples keys, keys will be joined by a "-"
   * Ex: ([{a: 100, b: 200, c:300}], 'a', 'b') will return {'100-200':{a: 100, b: 200, c:300}}
   */
  export function arrayToObject<T>(data: T[], ...keys: string[]): Record<string, T> {
    if (!data || typeof data !== 'object') {
      console.error('Argument type unexpected', data);
      throw new Error('Argument type unexpected');
    }

    const res = {};

    for (const item of data) {
      const tmp = [];
      for (const tmpKey of keys) {
        tmp.push(item[tmpKey]);
      }

      const key = tmp.join('-');
      res[key] = item;
    }

    return res;
  }

  /**
   * Remove accents from string
   */
  export function removeAccent(data: string): string {
    if (Global.isEmpty(data)) {
      return null;
    }

    const value = data + '';
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Deeply clone objects
   *
   * Do not use on objects containing functions, it will crash !
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#things_that_dont_work_with_structured_clone
   */
  export function clone<T>(data: T): T {
    if (structuredClone) {
      return structuredClone(data);
    } else {
      return JSON.parse(JSON.stringify(data)); // Fallback for unsupported devices
    }
  }

  export function formatText(data: string, options: { allowCharacters?: string[], allowAccents?: boolean, disableUpperCase?: boolean } = {}): string {
    if (Global.isEmpty(data)) {
      return '';
    }

    let formattedString = data;
    if (!options.disableUpperCase) {
      formattedString = data.toUpperCase();
    }

    const replaceSpecialCharacters = formattedString
      .replaceAll('œ', 'oe')
      .replaceAll('Œ', 'OE');

    const allowCharacters = (Global.isPopulated(options.allowCharacters)) ? options.allowCharacters : [];
    let withoutAccents = replaceSpecialCharacters;
    if (options.allowAccents) {
      allowCharacters.push('À-Ö', 'Ø-ö', 'ø-ÿ');
    } else {
      withoutAccents = Global.removeAccent(replaceSpecialCharacters);
    }

    const regexpWhitelistPattern = `[^a-zA-Z0-9 ${allowCharacters.join('')}]`;
    const regexpWhitelist = new RegExp(regexpWhitelistPattern, 'g');
    const regexpMultipleSpaces = new RegExp(/\s+/, 'g');
    const withoutSpecialCharacters = withoutAccents
      .replaceAll(regexpWhitelist, ' ')
      .replaceAll(regexpMultipleSpaces, ' ');

    return withoutSpecialCharacters.trim();
  }

  export function getEnumKeyByValue(data: any, value: string | number): any {
    let res;

    const keys = Object.keys(data);
    for (const key of keys) {
      if (Global.isNumber(key)) { // Skip if key is a number
        continue;
      }

      if (data[key] === value) {
        res = key;
        break;
      }
    }

    return res;
  }

  export function sort<T>(options: { data: T[], key?: string, keys?: string[], descending?: boolean }): T[] {
    const key = options.key || options.keys?.[0];
    const key2 = options.keys?.[1];

    const res = Global.clone(options.data);
    res.sort((a, b) => {
      const hasProperty = Global.isPopulated(a[key]);
      if (hasProperty && a[key] > b[key]) {
        return (options.descending) ? -1 : 1;
      } else if (!hasProperty || a[key] < b[key]) {
        return (options.descending) ? 1 : -1;
      } else {
        if (key2) {
          const hasProperty2 = Global.isPopulated(a[key2]);
          if (hasProperty2 && a[key2] > b[key2]) {
            return (options.descending) ? -1 : 1;
          } else if (!hasProperty2 || a[key2] < b[key2]) {
            return (options.descending) ? 1 : -1;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
    });

    return res;
  }

  /**
   * Access object property via string path.
   * If the path doesn't match, it returns undefined;
   *
   * Ex: get({a: {b: [{c: 1}, {c: 2}]}}, 'a.b[1].c'); // Returns 2
   */
  export function get<T = any>(data: any, stringPath: string): T | undefined {
    stringPath = stringPath.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    stringPath = stringPath.replace(/^\./, ''); // strip a leading dot

    const properties = stringPath.split('.');
    for (let i = 0, n = properties.length; i < n; ++i) {
      const property = properties[i];
      if (property in data) {
        data = data[property];
      } else {
        return undefined;
      }
    }

    return data;
  }

  export function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}

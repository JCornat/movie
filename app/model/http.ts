import fs from 'node:fs';
import { finished } from 'node:stream/promises';
import { Readable } from 'node:stream';

export namespace Http {
  export async function get(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any | string> {
    return await build('get', url, form, options);
  }

  export async function post(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    return await build('post', url, form, options);
  }

  export async function put(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    return await build('put', url, form, options);
  }

  export async function del(url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any | string> {
    return await build('delete', url, form, options);
  }

  export async function download(url: string, destinationPath: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error(`No body in response from ${url}`);
    }

    const fileStream = fs.createWriteStream(destinationPath);
    const body = Readable.fromWeb(response.body as any);
    body.pipe(fileStream);
    return await finished(fileStream);
  }

  export async function build(method: string, url: string, form: any = {}, options: { resolveHeaders?: boolean, headers?: { [key: string]: any } } = {}): Promise<any> {
    const headers: Record<string, string> = { ...options.headers };

    if (form.token) {
      headers['X-Access-Token'] = form.token;
      delete form.token;
    }

    let finalUrl = url;
    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
      headers,
    };

    if (fetchOptions.method === 'GET' || fetchOptions.method === 'DELETE') {
      const params = new URLSearchParams(form);
      const queryString = params.toString();
      if (queryString) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString;
      }
    } else {
      // For POST/PUT, if it's "form" data:
      const body = new URLSearchParams();
      for (const key in form) {
        body.append(key, form[key]);
      }

      fetchOptions.body = body;
    }

    const response = await fetch(finalUrl, fetchOptions);
    const bodyText = await response.text();

    if (!response.ok) {
      throw {
        status: response.status,
        message: bodyText || response.statusText,
      };
    }

    let data;
    try {
      data = JSON.parse(bodyText);
    } catch {
      data = bodyText;
    }

    if (options?.resolveHeaders) {
      return {
        content: data,
        headers: Array.from(response.headers.entries()),
      };
    }

    return data;
  }
}

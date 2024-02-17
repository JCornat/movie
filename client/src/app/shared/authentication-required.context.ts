import { HttpContext, HttpContextToken } from '@angular/common/http';

export const AUTHENTICATION_REQUIRED_CONTEXT: HttpContextToken<boolean> = new HttpContextToken(() => false);

export function authentificationRequired(): HttpContext {
  return new HttpContext().set(AUTHENTICATION_REQUIRED_CONTEXT, true);
}

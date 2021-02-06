import { HttpRequest } from '@angular/common/http';

export interface Request {
  method?: string;
  url: string;
  body?: any;
  req?: HttpRequest<any>;
  header?: {
    timeout?: number,
    disableAuthentication?: boolean,
    optionalAuthentication?: boolean,
    file?: any,
    reportProgress?: boolean,
    noHeader?: boolean,
    responseType?: string,
  };
}

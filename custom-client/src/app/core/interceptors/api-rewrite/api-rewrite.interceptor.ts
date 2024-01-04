import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Config } from '../../config/config';
import { ConfigInterface } from '../../config/config.interface';

export const apiRewriteInterceptor: HttpInterceptorFn = (req, next) => {
  const config: ConfigInterface = inject(Config);
  if (/^api/.test(req.url)) {
    return next(
      req.clone({
        url: req.url.replace(/^api/, config.apiUrl),
      }),
    );
  }
  return next(req);
};

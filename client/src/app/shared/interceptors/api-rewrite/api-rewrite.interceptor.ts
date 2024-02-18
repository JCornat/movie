import { HttpInterceptorFn } from '@angular/common/http';
import { getConfig } from '@shared/config/config.provider';

/**
 * Replace URL starting with `api` with correct url
 * @param req
 * @param next
 */
export const apiRewriteInterceptor: HttpInterceptorFn = (req, next) => {
  const SERVER_URL = getConfig('SERVER_URL');
  if (/^api/.test(req.url)) {
    return next(
      req.clone({
        url: req.url.replace(/^api/, `${SERVER_URL}/api`),
      }),
    );
  }

  return next(req);
};

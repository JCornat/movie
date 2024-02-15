import { HttpInterceptorFn } from '@angular/common/http';
import { getConfig } from '@shared/config/config.provider';

/**
 * Replace URL starting with `image` with correct url
 * @param req
 * @param next
 */
export const imageRewriteInterceptor: HttpInterceptorFn = (req, next) => {
  const SERVER_URL = getConfig('SERVER_URL');
  if (/^image/.test(req.url)) {
    return next(
      req.clone({
        url: req.url.replace(/^image/, `${SERVER_URL}/image`),
      }),
    );
  }

  return next(req);
};

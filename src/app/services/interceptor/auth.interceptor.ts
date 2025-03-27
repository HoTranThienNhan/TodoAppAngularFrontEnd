import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import * as globalVars from '../../../global';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const accessToken = authService.getAccessToken();
  const apiUrl: string = globalVars.domain + '/auth';

  const excludedUrls: string[] = [
    apiUrl + '/register',
    apiUrl + '/confirmEmailRegister',
    apiUrl + '/resendCode',
    apiUrl + '/login'
  ];

  // skip excluded urls
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  // set Authorization to headers
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });

  return next(authReq);
};

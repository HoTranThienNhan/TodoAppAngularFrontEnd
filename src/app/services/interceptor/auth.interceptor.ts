import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import * as globalVars from '../../../global';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { User } from '../../models/user/user.model';
import { AuthInterceptorSharedService } from '../shared/auth-interceptor/auth-interceptor.shared.service';

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  const authInterceptorSharedService = inject(AuthInterceptorSharedService);
  let accessToken = authService.getAccessToken();
  const apiUrl: string = globalVars.domain + '/auth';
  let isRefreshing: boolean = false;

  const excludedUrls: string[] = [
    apiUrl + '/register',
    apiUrl + '/confirmEmailRegister',
    apiUrl + '/resendCode',
    apiUrl + '/login',
    apiUrl + '/refreshToken'
  ];

  // skip excluded urls
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  // set Authorization to headers
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });

  authInterceptorSharedService.getIsRefreshingToken().subscribe((isRefreshingResult) => {
    isRefreshing = isRefreshingResult;
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        const user: User = JSON.parse(sessionStorage.getItem("user")!);

        if (!isRefreshing) {
          authInterceptorSharedService.setIsRefreshingToken(true);

          return authService.refreshToken({ userId: user.id })
            .pipe(
              switchMap((res) => {
                authInterceptorSharedService.setIsRefreshingToken(false);

                // set new access token
                authService.setAccessToken(res.data!.accessToken);
                accessToken = authService.getAccessToken();
                authInterceptorSharedService.setAccessToken(accessToken!);

                // set headers
                const authReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
                });

                // retry original request
                return next(authReq);
              })
            );
        } else {
          return authInterceptorSharedService.getAccessToken().pipe(
            switchMap((accessToken) => {
              // set headers
              const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
              });

              return next(authReq);
            }),
          )
        }
      }

      return throwError(() => err);
    })
  );
};
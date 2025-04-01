import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import * as globalVars from '../../../global';
import { catchError, EMPTY, finalize, Observable, throwError } from 'rxjs';
import { RefreshTokenResDto } from '../../models/auth/refresh-token-res-dto/refresh-token-res-dto.model';

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  let accessToken = authService.getAccessToken();
  const apiUrl: string = globalVars.domain + '/auth';

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

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        authService.refreshToken({ userId: "2aef648b-2e0a-43b9-a3a5-3ce59d5da236" }).subscribe({
          next: (res) => {
            // set new access token
            authService.setAccessToken(res.data!.accessToken);
            accessToken = authService.getAccessToken();

            // set headers
            const authReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });

            // retry original request
            return next(authReq).subscribe();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

      return throwError(() => err);
    })
  );
};
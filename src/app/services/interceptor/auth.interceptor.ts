import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import * as globalVars from '../../../global';
import { catchError,  Observable, throwError } from 'rxjs';
import { UserStore } from '../../stores/user.store';
import { User } from '../../models/user/user.model';

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const authService: AuthService = inject(AuthService);
  let accessToken = authService.getAccessToken();
  const apiUrl: string = globalVars.domain + '/auth';
  const userStore = inject(UserStore);

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
        const user: User = JSON.parse(sessionStorage.getItem("user")!);
        authService.refreshToken({ userId: user.id }).subscribe({
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
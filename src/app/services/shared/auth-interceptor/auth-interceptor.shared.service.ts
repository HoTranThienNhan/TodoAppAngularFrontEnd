import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorSharedService {

  _isRefreshingTokenSubject: Subject<boolean> = new Subject<boolean>();
  isRefreshingToken$: Observable<boolean> = this._isRefreshingTokenSubject.asObservable();

  _accessTokenSubject: Subject<string> = new Subject<string>();
  accessToken$: Observable<string> = this._accessTokenSubject.asObservable();

  constructor() { }

  setIsRefreshingToken(isRefreshing: boolean): void {
    this._isRefreshingTokenSubject.next(isRefreshing);
  }

  getIsRefreshingToken(): Observable<boolean> {
    return this.isRefreshingToken$;
  }


  setAccessToken(accessToken: string): void {
    this._accessTokenSubject.next(accessToken);
  }

  getAccessToken(): Observable<string> {
    return this.accessToken$;
  }
}

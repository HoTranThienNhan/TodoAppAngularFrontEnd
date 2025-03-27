import { inject, Injectable } from '@angular/core';
import * as globalVars from '../../../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDto } from '../../models/auth/register-dto/register-dto.model';
import { SigninDto } from '../../models/auth/signin-dto/signin-dto.model';
import { SigninResDto } from '../../models/auth/signin-res-dto/signin-res-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // auth APIs
  apiUrl: string = globalVars.domain + '/auth';
  private http: HttpClient = inject(HttpClient);
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  register(userRegister: RegisterDto): Observable<RegisterDto> {
    const fullApiUrl = this.apiUrl + "/register";

    return this.http.post<RegisterDto>(fullApiUrl, userRegister);
  }

  confirmEmailRegister(email: string, otpText: string): Observable<RegisterDto> {
    const fullApiUrl = this.apiUrl + "/confirmEmailRegister";

    return this.http.post<RegisterDto>(fullApiUrl, {
      email: email,
      otpText: otpText
    });
  }

  resendCode(email: string, firstName: string): Observable<any> {
    const fullApiUrl = this.apiUrl + "/resendCode";

    return this.http.post(fullApiUrl, {
      email: email,
      firstName: firstName
    });
  }

  signin(userSignin: SigninDto): Observable<SigninResDto> {
    const fullApiUrl = this.apiUrl + "/login";

    return this.http.post<SigninResDto>(fullApiUrl, userSignin);
  }

  getProfile(email: string): Observable<any> {
    const fullApiUrl = this.apiUrl + "/profile" + `?email=${email}`;

    return this.http.get<any>(fullApiUrl);
  }

  // tokens
  setAccessToken(accessToken: string): void {
    sessionStorage.setItem("accessToken", accessToken);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem("accessToken");
  }

  removeAccessToken(accessToken: string): void {
    sessionStorage.removeItem(accessToken);
  }
}

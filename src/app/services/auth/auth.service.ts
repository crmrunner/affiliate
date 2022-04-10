import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as con from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  get token(){
   return localStorage.getItem('affiliateAuthToken');
  }

  test(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'test';
    console.log('service:', data, apiBaseUrl);
    return this.http.get(apiBaseUrl, data);
  }

  login(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'login';
    return this.http.post(apiBaseUrl, data);
  }

  registration(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'registration';
    return this.http.post(apiBaseUrl, data);
  }

  forgotPassword(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'forgetPassword';
    return this.http.post(apiBaseUrl, data);
  }

  resetPassword(data: any, resetToken: string): Observable<any> {
    const apiBaseUrl = con.baseUrl+'reset_password/'+ encodeURIComponent(resetToken);
    return this.http.post(apiBaseUrl, data);
  }

  changePassword(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'change_password/';
    return this.http.post(apiBaseUrl, data);
  }

  logOut(): Observable<any> {
    const apiBaseUrl = con.baseUrl+'logout';
    return this.http.post(apiBaseUrl, {});
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('affiliateAuthToken');
    let spl = user ? user.split('.')[1] : '';
    spl = atob(spl);
    console.log('isLoggedIn:', spl);
    return user !== null ? true : false;
  }

}

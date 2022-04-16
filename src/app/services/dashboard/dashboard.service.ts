import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as con from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardInfo(): Observable<any> {
    const apiBaseUrl = con.baseUrl+'dashboard';
    return this.http.post(apiBaseUrl, {});
  }

  getSubscriberInfo(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'dashboard';
    return this.http.post(apiBaseUrl, data);
  }

  getProfilePictureInfo(data: any): Observable<any> {
    const apiBaseUrl = con.baseUrl+'changeProfileImage';
    return this.http.post(apiBaseUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as con from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private http: HttpClient) { }

  get token(){
   return localStorage.getItem('affiliateAuthToken');
  }

  getCountries(): Observable<any> {
    const apiBaseUrl = con.baseUrl+'getCountries';
    return this.http.get(apiBaseUrl);
  }
}

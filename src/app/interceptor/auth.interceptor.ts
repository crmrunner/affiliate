import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('affiliateAuthToken') != null) 
    {
      const token: any =  localStorage.getItem('affiliateAuthToken');
      // if the token is  stored in localstorage add it to http header
      const headers = new HttpHeaders().set("access-token", token);
      //clone http to the custom AuthRequest and send it to the server
      //console.log('loooo token: ', token);
      const AuthRequest = request.clone({
        headers: request.headers.set('authorization', 'Bearer '+token)
      });
      console.log('loooo AuthRequest: ', AuthRequest);
      return next.handle(AuthRequest)
    }else {
      return next.handle(request);
    }
  }
}

export const UserInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
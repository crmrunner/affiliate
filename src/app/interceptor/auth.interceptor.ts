import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) {}
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
      .pipe(catchError(err => {
        if ([401, 403].includes(err.status)) {
          localStorage.removeItem("affiliateAuthToken");
          this.router.navigate(['/']);
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        console.error('interceptErr: ',err);
        return throwError(() => new Error(error)); //throwError(error);
    }))
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
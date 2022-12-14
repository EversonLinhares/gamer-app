import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token');
    this.authService.isAuthenticated();

    const url = request.url;
    if(tokenString && !url.endsWith('/oauth/token')) {
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      request = request.clone({
        setHeaders : {
          Authorization: 'Bearer ' + jwt
        }
      })
    }
    return next.handle(request);
  }
}

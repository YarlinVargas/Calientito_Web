import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SpinnerService } from '../gen/spinner.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private spinnerSvc: SpinnerService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isValidToken = this.authService.isValidToken();//accessToken
    if (isValidToken) {
      return this.addToken(req, next);
    } else {
      return this.updateAccessTokenAndRefreshToken(req, next);
    }
  }
  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = JSON.parse(sessionStorage.getItem('auth')!);
    const authRequets = request.clone({
      setHeaders: {
        'Client': 'colcan',
        'Authorization': `Bearer ${token?.token}`,
      }
    });
    return next.handle(authRequets);
  }

  private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = JSON.parse(sessionStorage.getItem('auth')!);
    sessionStorage.removeItem('auth');
    const isValidToken = this.authService.isValidToken();//accessToken
    if (token && isValidToken) {
      return this.authService.refreshToken({ token: token?.token, refreshtoken: token?.refreshToken, redirect: token.redirect })
        .pipe(
          mergeMap((resp) => {
            sessionStorage.setItem('auth', JSON.stringify(resp.data));
            return this.addToken(request, next);
          }),
          catchError((error) => {
            return of(error);
          }),
          finalize(() => {
            this.spinnerSvc.hide();
          }))
    }
    else {
      return next.handle(request);
    }
  }
}



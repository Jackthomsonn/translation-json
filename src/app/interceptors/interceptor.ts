import { Router } from '@angular/router';
import { LoadingService } from './../services/loading/loading.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { ErrorService } from '../services/error/error.service';

import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService) { }

  private isAuthError(error: HttpErrorResponse): boolean {
    return error instanceof HttpErrorResponse && error.status === 401;
  }

  private isForbiddenError(error: HttpErrorResponse): boolean {
    return error instanceof HttpErrorResponse && error.status === 403;
  }

  private isNotFoundError(error: HttpErrorResponse): boolean {
    return error instanceof HttpErrorResponse && error.status === 404;
  }

  private isBadRequestError(error: HttpErrorResponse): boolean {
    return error instanceof HttpErrorResponse && error.status === 400;
  }

  private isTooLargeError(error: HttpErrorResponse): boolean {
    return error instanceof HttpErrorResponse && error.status === 413;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    });

    return next.handle(request).pipe(catchError(error => {
      if (this.isAuthError(error)) {
        return this.authenticationService.getRefreshToken().pipe(switchMap(() => {
          request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
          });

          return next.handle(request);
        }));
      }

      if (this.isForbiddenError(error)) {
        this.router.navigate(['login']);
        this.loadingService.isLoading.next(false);
      }

      if (this.isNotFoundError(error) || this.isBadRequestError(error) || this.isTooLargeError(error)) {
        this.errorService.exceptionCaught.next(error);
        this.loadingService.isLoading.next(false);
      }

      return next.handle(request);
    }));
  }
}

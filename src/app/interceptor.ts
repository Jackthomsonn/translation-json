import { LoadingService } from './services/loading/loading.service';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from './services/error/error.service';

import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => {
      this.errorService.exceptionCaught.next(error);
      this.loadingService.isLoading.next(false);
      return of(error);
    }));
  }
}

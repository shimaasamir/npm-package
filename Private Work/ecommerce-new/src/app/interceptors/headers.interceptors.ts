import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/API/auth.service';
import { SessionService } from '../services/LocalStorage/session.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.clone({
      headers: req.headers.set('X-localization', 'en'),
    });

    if (this.authService.isAuthenticatedUrl(req.url)) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.sessionService.getToken()}`
        ),
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

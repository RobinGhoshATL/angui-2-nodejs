import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const TOKEN_HEADER_KEY = 'Authorization';
var x_functions_key = '';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: any;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.user = this.auth.getLoggedInUser().name;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next))
  }
  async handle(req: HttpRequest<any>, next: HttpHandler) {
    let customRequest = req;

    if (req.url.match(/api\//)) {
      if(req.url.indexOf("functions") > -1) {
        x_functions_key = environment.x_functions_key;
  }
      const token = await this.auth.getToken();

      customRequest = req.clone({
        headers: req.headers
          .set(TOKEN_HEADER_KEY, 'Bearer ' + token)
          .set("x-functions-key", x_functions_key)
          .set("User", this.user)
          .set("Role", "default")
          .set("Content-Type", "application/json; charset=utf-8")
      });
    }

    // Important: Note the .toPromise()
    return next.handle(customRequest).toPromise()
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
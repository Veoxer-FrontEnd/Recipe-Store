import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthHttpInterceptors implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.authService.authenticatedUser.pipe(take(1), exhaustMap(userData => {
        if (!req.url.includes('api/auth/')) {
          console.log(req.url);
          req = req.clone({
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + userData.token)
          });
        }
        return next.handle(req);
      }));
    }
}

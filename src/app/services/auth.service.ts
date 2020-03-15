import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import {AuthUser} from '../shared/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  authenticatedUser = new BehaviorSubject<AuthUser>(null);
    constructor(private httpClient: HttpClient) { }

    register(registerForm: FormGroup) {
        return this.httpClient.post('http://localhost:49273/api/auth/register', registerForm)
            .pipe(catchError(this.handleError));
    }

    login(loginForm: FormGroup) {
        return this.httpClient.post<{token: string}>('http://localhost:49273/api/auth/login', loginForm)
          .pipe(catchError(this.handleError), tap(data => {
            this.handleAuthentication(data.token);
          }));
    }

    autoLogin() {
      const helper = new JwtHelperService();
      const authUser = JSON.parse(localStorage.getItem('userData'));
      if (authUser && !helper.isTokenExpired(authUser._token)) {
        this.authenticatedUser.next(authUser);
      } else {
        localStorage.removeItem('userData');
        this.authenticatedUser.next(null);
      }
    }

    logout() {
      this.authenticatedUser.next(null);
      localStorage.removeItem('userData');
    }

    private handleAuthentication(token: string) {
      if (token && token !== '') {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const expirationDate = helper.getTokenExpirationDate(token);
        const user = new AuthUser(decodedToken.unique_name, decodedToken.nameid, expirationDate, token);
        this.authenticatedUser.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
    }

    private handleError(errors: HttpErrorResponse) {
        let errorsMsg = 'An unknown error occurred!';
        console.log(errors);
        if (!errors?.error?.errors) {
            return throwError(errors.error !== '' ? errors.error : errorsMsg);
        }
        const errorsList = Object.keys(errors.error.errors).map(key => errors.error.errors[key]);
        errorsMsg = errorsList.join(',');
        return throwError(errorsMsg);
    }
}

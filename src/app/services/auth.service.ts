import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    register(registerForm: FormGroup) {
        return this.httpClient.post('https://localhost:44348/api/auth/register', registerForm)
            .pipe(catchError(this.handleError), tap());
    }

    login(loginForm: FormGroup) {
        return this.httpClient.post('https://localhost:44348/api/auth/login', loginForm);
    }

    private handleError(errors: HttpErrorResponse) {
        let errorsMsg = 'An unknown error occurred!';
        if (!errors?.error?.errors) {
            return throwError(errorsMsg);
        }

        const data = {
            a: "first",
            b: "second",
        };
        const errorsList = Object.keys(errors.error.errors).map(key => errors.error.errors[key]);
        errorsMsg = errorsList.join(",");
        
        return throwError(errorsMsg);
    }
} 
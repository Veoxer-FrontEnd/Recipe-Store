import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthHttpInterceptors implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){

        console.log("test");

        console.log(req.body);
        return next.handle(req);
    }
}
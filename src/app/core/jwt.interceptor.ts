import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './services/authentication.service';
import { APP_CONFIG, AppConfig } from 'app/app-config.module';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        // HIMS Link
        //  request = request.clone({ url: `http://localhost:63750/swagger/index.html/${request.url}` });
        // request = request.clone({ url: `http://103.117.208.130:6064/api/${request.url}` });
        //  request = request.clone({ url: `http://103.113.29.249:56/api/${request.url}` });


                        //  request = request.clone({ url: `http://103.117.208.130:6062/api/${request.url}` });
        // Construction Link
        request = request.clone({ url: this.config.apiEndpoint +`/${request.url}` });
        // request = request.clone({ url: `http://103.113.29.249:7002/api/${request.url}` });
        // Local Link
    //    request = request.clone({ url: `http://localhost:63750/api/${request.url}` });
        return next.handle(request);
    }
}
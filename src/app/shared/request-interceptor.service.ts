import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentcation/authentication.service';
import {Injectable} from '@angular/core';
import {any} from 'codelyzer/util/function';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // for each request, we must send the authorization in order to be authenticated in the Backend server
    // request object is immutable
    let clone: HttpRequest<any>;
    if (!req.url.endsWith('login') && !req.url.endsWith('register')) {
      const newHeaders = req.headers.append('Authorization', this.authService.getToken());
      clone = req.clone(
        {
          headers: newHeaders
        }
      );
    } else {
      clone = req.clone();
    }
    return next.handle(clone);
  }
}

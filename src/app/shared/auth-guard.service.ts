import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentcation/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}

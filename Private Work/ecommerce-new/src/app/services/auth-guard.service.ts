import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './API/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      return true;
    }
    this.router.navigate(['./login'], {
      queryParams: { returnUrl: _state.url },
    });
    return false;
  }
}

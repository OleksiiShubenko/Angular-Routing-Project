import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const {url} = state;

  console.log('CanActivate Guard is called');

  //return true or UrlTree by calling router.parseUrl('/login')
  return authService.checkLogin(url)
    ? true
    : router.parseUrl('/login');
};

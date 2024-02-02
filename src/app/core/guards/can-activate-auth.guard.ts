import {CanActivateFn, NavigationExtras, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const {url} = state;

  console.log('CanActivate Guard is called');

  // when click to admin tab, canActivateAuthGuard is called and we add params when navigate to login component
  const sessionId = 123456789;
  const navigationExtras: NavigationExtras = {
    queryParams: {sessionId},
    fragment: 'anchor'
  };

  //return true or UrlTree by calling router.parseUrl('/login')
  if (authService.checkLogin(url)) {
    return true;
  } else {
    router.navigate(['/login'], navigationExtras);
    return false;
  }
};

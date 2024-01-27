import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {catchError, delay, EMPTY, finalize, of, switchMap, take} from 'rxjs';
import {UserModel} from '../models/user.model';
import {UserArrayService} from '../services';
import {SpinnerService} from "../../widgets";

export const userResolver: ResolveFn<UserModel> = (route, state) => {
  const userArrayService = inject(UserArrayService);
  const router = inject(Router);

  //if some delays occurs, spinner will be shown or hidden
  const spinnerService = inject(SpinnerService)

  console.log('userResolver is called');

  //if we add these resolver for create user form, then id is missed and just return empty UserModel
  if (!route.paramMap.has('userId')) {
    return of(new UserModel(null, '', ''));
  }

  spinnerService.show()
  const id = route.paramMap.get('userId')!;

  return userArrayService.getUser(id)
    .pipe(
      delay(2000),
      switchMap((user: UserModel) => {
        if (user) {
          return of(user);
        } else {
          router.navigate(['/users']);

          return EMPTY;
        }
      }),
      //take 1 element to finish observer
      take(1),
      catchError(() => {
        router.navigate(['/users']);

        // catchError MUST return observable
        return EMPTY;
      }),
      finalize(() => spinnerService.hide())
    );
};

import {Component, type OnInit, inject, DestroyRef} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';
import {CanComponentDeactivate, DialogService} from "../../../core";

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;
  private sub!: Subscription;
  private userArrayService = inject(UserArrayService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  //will be used to specify is Back button clicked
  private onGoBackClick: boolean = false;
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.user = new UserModel(null, '', '');
// we should recreate component because this code runs only once
    const id = this.route.snapshot.paramMap.get('userId')!;
    const observer = {
      next: (user: UserModel) => {
        this.user = {...user};
        this.originalUser = {...user};
      },
      error: (err: any) => console.log(err)
    };
    this.sub = this.userArrayService.getUser(id).subscribe(observer);
// OnDestroy
    this.destroyRef.onDestroy(() => {
      console.log('OnDestroy hook of UserForm via DestroyRef');
      this.sub.unsubscribe();
    });
  }

  onSaveUser(): void {
    const user = {...this.user};
    const method = user.id ? 'updateUser' : 'createUser';
    this.userArrayService[method](user);
    if (user.id) {
      this.router.navigate(['/users', {editedUserId: user.id}])
    } else {
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.onGoBackClick = true;
    // relatively go to the users-list (/users)
    //url is ./users/edit/1, navigate back from last 2 part of this url to /users
    this.router.navigate(['./../../'], {relativeTo: this.route})
  }

  //canDeactivateGuard accept components that are implemented CanComponentDeactivate interface
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //go back if Back button is clicked
    if (this.onGoBackClick) return true;
    const flags = (Object.keys(this.originalUser) as (keyof UserModel)[]).map(key => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });
    //if user in ford was not changed allow to leave component
    if (flags.every(el => el)) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}

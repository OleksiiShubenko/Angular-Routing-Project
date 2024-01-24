import {Component, inject, type OnInit} from '@angular/core';
import {EMPTY, type Observable, catchError} from 'rxjs';
import type {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';
import {ActivatedRoute, Router} from "@angular/router";
import {DestroyRef} from "@angular/core";
import {Input} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;
  private userArrayService = inject(UserArrayService);

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  //not required parameter. We get these value when navigate to these component with optional parameter 'editedUserId'
  @Input() editedUserId!: string;
  private editedUser!: UserModel;

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.users$ = this.userArrayService.users$
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      );

    // listen to editedUserId => editedUser from UserFormComponent
    const observer = {
      next: (user: UserModel) => {
        //if user exist by provided editedUserId then copy it to editedUser
        this.editedUser = { ...user };
        console.log(`editedUserId: ${this.editedUserId} Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('Complete listening to editedUser')
    };
    //create subscription to fetch user when editedUserId was provided
    this.userArrayService
      .getUser(this.editedUserId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(observer);
  }

  // will be used in template and return true for edited user (to change class)
  isEdited({ id }: UserModel): boolean {
    if (this.editedUser) {
      return id === this.editedUser.id;
    }
    return false;
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }

  onEditUser({id}: UserModel): void {
    // full path is used
    // const link = ['/users/edit', id];
    // this.router.navigate(link);
    // or relative path is used (active route is users now)
    const link = ['edit', id];
    this.router.navigate(link, {relativeTo: this.route});
  }
}

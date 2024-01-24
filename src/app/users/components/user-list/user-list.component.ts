import {Component, inject, type OnInit} from '@angular/core';
import {EMPTY, type Observable, catchError} from 'rxjs';
import type {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;
  private userArrayService = inject(UserArrayService);

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.users$ = this.userArrayService.users$
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      );
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

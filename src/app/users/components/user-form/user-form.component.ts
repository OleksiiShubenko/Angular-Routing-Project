import {Component, type OnInit, inject, DestroyRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user!: UserModel;
  originalUser!: UserModel;
  private sub!: Subscription;
  private userArrayService = inject(UserArrayService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

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
    // relatively go to the users-list (/users)
    this.router.navigate(['./../../'], {relativeTo: this.route})
  }
}

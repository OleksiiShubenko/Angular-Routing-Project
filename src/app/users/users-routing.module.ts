import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users.component";
import {UserFormComponent, UserListComponent} from './components';
import {canDeactivateGuard} from "../core";
import {userResolver} from "./resolvers";

const routes: Routes = [
  {
    // path: 'users',
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:userId',
        canDeactivate: [canDeactivateGuard],
        resolve: {
          userFromResolver: userResolver
        },
        component: UserFormComponent,
      },
      {
        path: '',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  // statically specify components that are used in routing and will be used in declarations in module
  static components = [UsersComponent, UserListComponent, UserFormComponent];
}

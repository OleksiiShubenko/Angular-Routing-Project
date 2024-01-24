import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {FormsModule} from "@angular/forms";
import {UserComponent, UserFormComponent, UserListComponent} from './components';

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,

    UsersRoutingModule,

    UserComponent
  ]
})
export class UsersModule {
}

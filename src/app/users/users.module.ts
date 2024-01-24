import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {FormsModule} from "@angular/forms";
import {UserComponent} from './components';

@NgModule({
  declarations: [UsersRoutingModule.components],
  imports: [
    CommonModule,
    FormsModule,

    UsersRoutingModule,

    UserComponent
  ]
})
export class UsersModule {
}

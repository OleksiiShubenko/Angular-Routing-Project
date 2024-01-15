import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TasksRoutingModule} from './tasks-routing.module';
import {FormsModule} from "@angular/forms";
import {TaskComponent, TaskListComponent} from './components';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,

    TaskComponent
  ]
})
export class TasksModule {
}

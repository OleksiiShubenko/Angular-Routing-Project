import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskFormComponent, TaskListComponent} from "./components";

const routes: Routes = [
  {
    // path: 'task-list',
    //TaskListComponent will be put to <router-outlet> tag on html
    path: 'home',
    component: TaskListComponent,
    title: 'Home'
  },
  {
    // taskId - required pass parameter
    path: 'edit/:taskId',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

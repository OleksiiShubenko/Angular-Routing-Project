import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskFormComponent, TaskListComponent} from "./components";

const routes: Routes = [
  {
    // path: 'task-list',
    path: 'home',
    component: TaskListComponent
  },
  {
    // taskID - required pass parameter
    path: 'edit/:taskId ',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

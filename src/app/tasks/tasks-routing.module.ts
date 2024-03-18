import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskFormComponent, TaskListComponent} from "./components";
import {MetaDefinition} from "@angular/platform-browser";

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'Task Manager Application. This is SPA'
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA, Routing'
  }
];

const routes: Routes = [
  {
    // path: 'task-list',
    //TaskListComponent will be put to <router-outlet> tag on html
    path: 'home',
    component: TaskListComponent,
    title: 'Home1',
    data: {
      myMeta: metaTags
    }
  },
  {
    // taskId - required pass parameter
    path: 'edit/:taskId',
    component: TaskFormComponent
  },
  {
    path: 'add',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

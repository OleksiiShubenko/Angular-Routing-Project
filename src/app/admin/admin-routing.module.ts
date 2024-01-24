import {NgModule} from '@angular/core';
import {RouterModule, type Routes} from '@angular/router';
import {AdminDashboardComponent, ManageTasksComponent, ManageUsersComponent} from "./components";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'users', component: ManageUsersComponent},
          {path: 'tasks', component: ManageTasksComponent},
          {path: '', component: AdminDashboardComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminDashboardComponent,
    ManageTasksComponent,
    ManageUsersComponent
  ];
}

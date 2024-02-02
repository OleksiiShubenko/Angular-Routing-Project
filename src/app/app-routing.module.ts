import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup} from '@angular/router';
import {AbcComponent, AboutComponent, LoginComponent, MessagesComponent, PathNotFoundComponent} from './pages'

const routes: Routes = [
  {
    path: 'messagesPath',
    component: MessagesComponent,
    outlet: 'messagesOutletName'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {path: 'about', component: AboutComponent},
  {
    component: AbcComponent,
    matcher: (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null => {
      console.log(url, group, route);
      // один фрагмент, который включает 'abc'
      return url.length === 1 && url[0].path.includes('abc') ? ({consumed: url}) : null;
    }
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PathNotFoundComponent}
];

@NgModule({
  // bindToComponentInputs is used to allow binding parthParam - taskId to @Input() taskId in task-form component
  imports: [RouterModule.forRoot(routes, {useHash: false, bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

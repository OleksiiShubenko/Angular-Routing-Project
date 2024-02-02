import {NgModule} from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  Route,
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup
} from '@angular/router';
import {AbcComponent, AboutComponent, LoginComponent, MessagesComponent, PathNotFoundComponent} from './pages'
import {canMatchAuthGuard} from "./core";

const routes: Routes = [
  {
    path: 'messagesPath',
    component: MessagesComponent,
    outlet: 'messagesOutletName'
  },
  {
    path: 'admin',
    canMatch: [canMatchAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'admin',
    redirectTo: '/login',
    pathMatch: 'full'
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

const extraOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  // bindToComponentInputs is used to allow binding pathParam - taskId to @Input() taskId in task-form component
  bindToComponentInputs: true,
  useHash: false,
  enableTracing: true // Makes the router log all its internal events to the console.
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

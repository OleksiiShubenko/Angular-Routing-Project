import {NgModule} from '@angular/core';
import {ExtraOptions, Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup} from '@angular/router';
import {AbcComponent, AboutComponent, LoginComponent, MessagesComponent, PathNotFoundComponent} from './pages'
import {canMatchAuthGuard, CustomPreloadingStrategyService} from "./core";

const routes: Routes = [
  {
    path: 'messagesPath',
    component: MessagesComponent,
    outlet: 'messagesOutletName'
  },
  {
    path: 'admin',
    canMatch: [canMatchAuthGuard],
    data: {
      //will be used in CustomPreloadingStrategyService
      myCustomPreload: false
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'Admin'
  },
  {
    path: 'admin',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'users',
    data: {
      myCustomPreload: true
    },
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    title: 'Users'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About'
  },
  {
    component: AbcComponent,
    matcher: (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null => {
      console.log(url, group, route);
      // один фрагмент, который включает 'abc'
      return url.length === 1 && url[0].path.includes('abc') ? ({consumed: url}) : null;
    }
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: '**',
    component: PathNotFoundComponent,
    title: 'Page Not Found'
  }
];

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService,
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

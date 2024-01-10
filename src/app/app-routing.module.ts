import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup} from '@angular/router';
import { AboutComponent, AbcComponent, HomeComponent, PathNotFoundComponent } from './pages'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    component: AbcComponent,
    matcher: (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null => {
      console.log(url, group, route);
      // один фрагмент, который включает 'abc'
      return url.length === 1 && url[0].path.includes('abc') ? ({consumed: url}) : null;
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

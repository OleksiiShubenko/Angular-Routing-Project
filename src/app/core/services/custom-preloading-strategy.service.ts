import {Injectable} from '@angular/core';
import {PreloadingStrategy, type Route} from '@angular/router';
import {type Observable, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  public preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    //get from router config data object
    if (route.data?.['myCustomPreload'] && route.path) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return EMPTY;
    }
  }
}

import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterOutlet, Event} from "@angular/router";
import {MessagesService} from "./core/services/messages.service";
import {SpinnerService} from "./widgets";
import {CustomPreloadingStrategyService} from "./core";
import {filter, Subscription} from "rxjs";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'angular-routing-project';

  messagesService = inject(MessagesService)
  spinnerService = inject(SpinnerService)

  private router = inject(Router)
  private preloadingStrategy = inject(CustomPreloadingStrategyService);
  private sub: { [key: string]: Subscription } = {};

  private metaService = inject(Meta);

  ngOnInit(): void {
    console.log(`Preloading Modules: `, this.preloadingStrategy.preloadedModules);
    this.setMessageServiceOnRefresh();
  }

  private setMessageServiceOnRefresh(): void {
    this.sub['navigationStart'] = this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationStart))
      .subscribe((event: Event) => {
        // returns true if url contains 'messagesOutletName:'
        this.messagesService.isDisplayed = (event as NavigationStart).url.includes('messagesOutletName:');
      });
  }

  ngOnDestroy(): void {
    this.sub['navigationStart'].unsubscribe();
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    // console.log('Activated Component', $event, routerOutlet);
    this.metaService.addTags(routerOutlet.activatedRouteData['myMeta']);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    // console.log('Deactivated Component', $event, routerOutlet);
  }

  onRouterLinkActive($event: boolean) {
    console.log("Is about active: " + $event)
  }

  onDisplayMessages(): void {
    //navigate to outlet: outletName (in the <router-outlet name="outletName">): ['outletPath'] (which is specified in router path)
    this.router.navigate([{outlets: {messagesOutletName: ['messagesPath']}}])
    this.messagesService.isDisplayed = true;
  }

}

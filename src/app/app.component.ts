import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {MessagesService} from "./core/services/messages.service";
import {SpinnerService} from "./widgets";
import {CustomPreloadingStrategyService} from "./core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private preloadingStrategy = inject(CustomPreloadingStrategyService);
  title = 'angular-routing-project';

  private router = inject(Router)
  messagesService = inject(MessagesService)
  spinnerService = inject(SpinnerService)

  ngOnInit(): void {
    console.log(`Preloading Modules: `, this.preloadingStrategy.preloadedModules);
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    // console.log('Activated Component', $event, routerOutlet);
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

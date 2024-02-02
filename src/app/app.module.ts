import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Router, TitleStrategy} from "@angular/router";
import {TasksModule} from './tasks/tasks.module';
import {SpinnerComponent} from "./widgets";
import {FormsModule} from "@angular/forms";
import {PageTitleStrategy} from "./core";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TasksModule,

    // UsersModule,
    // AdminModule,

    //must be last
    AppRoutingModule,

    SpinnerComponent
  ],
  providers: [ { provide: TitleStrategy, useClass: PageTitleStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: unknown): string =>
      typeof value === 'function' ? value.name : (value as string);
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

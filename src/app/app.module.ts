import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Router} from "@angular/router";
import {TasksModule} from './tasks/tasks.module';
import {SpinnerComponent} from "./widgets";
import {FormsModule} from "@angular/forms";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: unknown): string =>
      typeof value === 'function' ? value.name : (value as string);
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

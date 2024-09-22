import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegisterPageComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}

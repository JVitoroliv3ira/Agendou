import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormInputComponent} from "./components/form-input/form-input.component";
import {FormsModule} from "@angular/forms";
import { ApplicationVersionComponent } from './components/application-version/application-version.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    FormInputComponent,
    ApplicationVersionComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormInputComponent,
    ApplicationVersionComponent,
    ButtonComponent
  ]
})
export class SharedModule {
}

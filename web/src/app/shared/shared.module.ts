import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormInputComponent} from "./components/form-input/form-input.component";
import {FormsModule} from "@angular/forms";
import { ApplicationVersionComponent } from './components/application-version/application-version.component';


@NgModule({
  declarations: [
    FormInputComponent,
    ApplicationVersionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormInputComponent,
    ApplicationVersionComponent
  ]
})
export class SharedModule {
}

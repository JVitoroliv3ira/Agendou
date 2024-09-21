import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormInputComponent} from "./components/form-input/form-input.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormInputComponent
  ]
})
export class SharedModule {
}

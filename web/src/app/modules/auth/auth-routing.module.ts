import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Agendou | Cadastre-se'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

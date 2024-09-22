import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Agendou | Cadastre-se'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Agendou | Login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

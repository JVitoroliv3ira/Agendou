import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./pages/home-page/home-page.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Agendou | Home'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'changePassword/:token',
    component:LoginComponent
  },
];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}

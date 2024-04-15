import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [

  {
    path: '',
    pathMatch:'full',
    title: 'Inicio de sesión',
    component: LoginComponent
  },
  {
    path: 'login',
    title: 'Inicio de sesión',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }

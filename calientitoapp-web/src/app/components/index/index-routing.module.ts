import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RpasswordComponent } from './rpassword/rpassword.component';
import { PasswordComponent } from './password/password.component';

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
  {
    path:'recoverPassword',
    title: 'Olvide contraseña',
    component: RpasswordComponent
  },
  {
    path:'createAccount',
    title: 'Crear cuenta',
    component: PasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }

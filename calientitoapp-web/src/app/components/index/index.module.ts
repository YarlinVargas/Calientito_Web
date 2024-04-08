import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexRoutingModule } from "./index-routing.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations:[
    LoginComponent,
    ChangePasswordComponent
  ],
  imports:[
    CommonModule,
    IndexRoutingModule,
  ],
  providers:[
    // {
    //   provide:RECAPTCHA_LANGUAGE,
    //   useValue: "es"
    // }
  ]
})
export class IndexModule {}

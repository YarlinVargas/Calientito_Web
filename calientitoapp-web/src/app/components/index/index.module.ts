import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { LoginComponent } from './login/login.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RECAPTCHA_LANGUAGE, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../core/shared/shared.module";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    providers: [
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: "es", // use spanish language
        },
    ],
    imports: [
        CommonModule,
        IndexRoutingModule,
        FontAwesomeModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class IndexModule { }

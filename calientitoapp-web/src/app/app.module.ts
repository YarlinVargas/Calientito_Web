import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import {DialogModule} from '@angular/cdk/dialog';
// import { InterceptorService } from './core/services/config/interceptor.service';
import { SharedModule } from './core/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    DialogModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

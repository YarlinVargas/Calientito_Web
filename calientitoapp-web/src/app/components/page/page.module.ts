import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    // GestorUsuarioComponent,
    // CreateOrUpdateUserComponent,
    // GestorClienteComponent,
    // GestorNotificacionComponent,
    // GestorRequerimientosComponent,
    // GestorOrdenTrabajoComponent,
    // ConocenosMasComponent,
    // CreateOrUpdateClientComponent,
    // CreateOrUpdateRequirenmentComponent,
    // CreateOrUpdateOrdenComponent,
    // CreateOrUpdateNotificacionComponent,
    // GestorProductosComponent,
    // CreateOrUpdateProductComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,

  ]
})
export class PageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FieldInputComponent } from './field-input/field-input.component';
import { FieldDateComponent } from './field-date/field-date.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardComponent } from './card/card.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToggleComponent } from './toggle/toggle.component';
import { FieldSelectOptionComponent } from './field-selectOption/field-selectOption.component';
import { FieldSelectComponent } from './field-select/field-select.component';
import { ModalMsjComponent } from './modals/modal-msj/modal-msj.component';
import { CardExamComponent } from './card-exam/card-exam.component';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { ToggleListComponent } from './toggle-list/toggle-list.component';
import { CardViewComponent } from './card-view/card-view.component';
import { FooterComponent } from './footer/footer.component';
import { ModalDetalleUsuarioComponent } from './modals/modal-detalle-usuario/modal-detalle-usuario.component';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import {DetalleResultadoComponent} from './detalle-resultado/detalle-resultado.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FieldInputEmailComponent } from './field-input-email/field-input-email.component';
import { GoUpComponent } from './go-up/go-up.component';
import { ModalInputComponent } from './modals/modal-input/modal-input.component';

@NgModule({
  declarations: [
    TableComponent,
    ActionsTableComponent,
    FieldInputComponent,
    FieldDateComponent,
    ButtonsComponent,
    CardComponent,
    TabsComponent,
    FieldSelectOptionComponent,
    FieldSelectComponent,
    ToggleComponent,
    ModalMsjComponent,
    CardExamComponent,
    ToggleListComponent,
    CardViewComponent,
    FooterComponent,
    ModalDetalleUsuarioComponent,
    DetalleResultadoComponent,
    SpinnerComponent,
    FieldInputEmailComponent,
    GoUpComponent,
    ModalInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OverlayModule,
    FontAwesomeModule,
    TooltipModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    TableComponent,
    FieldInputComponent,
    FieldDateComponent,
    ButtonsComponent,
    CardComponent,
    TabsComponent,
    CardExamComponent,
    ToggleComponent,
    ToggleListComponent,
    CardViewComponent,
    FieldSelectOptionComponent,
    FieldSelectComponent,
    ModalMsjComponent,  
    CardExamComponent,
    FooterComponent,
    DetalleResultadoComponent,
    SpinnerComponent,
    FieldInputEmailComponent,
    GoUpComponent
  ]
})
export class SharedModule {
}

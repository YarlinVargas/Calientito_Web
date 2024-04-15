import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'welcomePatient',
  //   component: WelcomeComponent,
  //   title: 'Bienvenid@ paciente'
  // },
  // {
  //   path:'welcomeCompany',
  //   component: WelcomeCompanyComponent,
  //   title: 'Bienvenido'
  // },
  // {
  //   path:'patientResult',
  //   component: ListResultadosPatientComponent,
  //   title: 'Resultado paciente'
  // },
  // {
  //   path:'result/:id:/:request',
  //   component: ResultComponent,
  //   title: 'Detalle resultado'
  // },
  // {
  //   path:'listcompanyResult',
  //   component: ListResultadosCompanyComponent,
  //   title: 'Lista empresas'
  // },
  // {
  //   path:'detailResultCompany/:id/:request/:status',
  //   component: DetailResultComponent,
  //   title: 'Detalle resultado'
  // },
  // {
  //   path:'perfil',
  //   component: PerfilComponent,
  //   title: 'Perfil'
  // },
  // {
  //   path: 'gestionUsuario',
  //   component: GestorUsuarioComponent,
  //   title: 'Gestion Usuario'
  // },
  // {
  //   path: 'createUser',
  //   component: CreateOrUpdateUserComponent,
  //   title: 'Crear Usuario'
  // },
  // {
  //   path: 'updateUser/:id',
  //   component: CreateOrUpdateUserComponent,
  //   title: 'Editar Usuario'
  // },
  // {
  //   path: 'client',
  //   component: GestorClienteComponent,
  //   title: 'Vista cliente'
  // },
  // {
  //   path: 'createClient',
  //   component: CreateOrUpdateClientComponent,
  //   title: 'Crear Cliente'
  // },
  // {
  //   path: 'updateClient/:id',
  //   component: CreateOrUpdateClientComponent,
  //   title: 'Editar Cliente'
  // },
  // {
  //   path: 'notification',
  //   component: GestorNotificacionComponent,
  //   title: 'Vista notificaciones'
  // },
  // {
  //   path: 'requirement',
  //   component: GestorRequerimientosComponent,
  //   title: 'Vista requerimientos'
  // },
  // {
  //   path: 'createRequirement',
  //   component: CreateOrUpdateRequirenmentComponent,
  //   title: 'Crear Requerimiento'
  // },
  // {
  //   path: 'updateRequirement/:id',
  //   component: CreateOrUpdateRequirenmentComponent,
  //   title: 'Editar Requerimiento'
  // },
  // {
  //   path: 'orders',
  //   component: GestorOrdenTrabajoComponent,
  //   title: 'Vista ordenes de trabajo'
  // },
  // {
  //   path: 'conocenos',
  //   component: ConocenosMasComponent,
  //   title: 'Vista conocenos mas'
  // },
  // {
  //   path:'productos',
  //   component: GestorProductosComponent,
  //   title:'Lista de productos'
  // },
  // {

  //   path: 'createProduct',
  //   component: CreateOrUpdateProductComponent,
  //   title: 'Crear Producto'
  // },
  // {
  //   path:'updateProduct/:id',
  //   component:CreateOrUpdateProductComponent,
  //   title:'Crear un producto'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

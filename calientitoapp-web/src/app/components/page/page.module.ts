import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GestorUsuarioComponent } from './usuario/gestor-usuario/gestor-usuario.component';
import { CreateOrUpdateUserComponent } from './usuario/gestor-usuario/create-or-update-user/create-or-update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';
import { GestorClienteComponent } from './usuario/cliente/gestor-cliente/gestor-cliente.component';
import { GestorNotificacionComponent } from './usuario/notificacion/gestor-notificacion/gestor-notificacion.component';
import { GestorRequerimientosComponent } from './usuario/requerimiento/gestor-requerimientos.component';
import { GestorOrdenTrabajoComponent } from './usuario/orden-trabajo/gestor-orden-trabajo/gestor-orden-trabajo.component';
import { ConocenosMasComponent } from './usuario/conocenos-mas/conocenos-mas/conocenos-mas.component';
import { CreateOrUpdateClientComponent } from './usuario/cliente/create-or-update-client/create-or-update-client/create-or-update-client.component';
import { CreateOrUpdateRequirenmentComponent } from './usuario/requerimiento/create-or-update-requirenment/create-or-update-requirenment/create-or-update-requirenment.component';
import { CreateOrUpdateOrdenComponent } from './usuario/orden-trabajo/create-or-update-orden/create-or-update-orden/create-or-update-orden.component';
import { CreateOrUpdateNotificacionComponent } from './usuario/notificacion/create-or-update-notificacion/create-or-update-notificacion/create-or-update-notificacion.component';
import { GestorProductosComponent } from './usuario/productos/gestor-productos/gestor-productos.component';
import { CreateOrUpdateProductComponent } from './usuario/productos/create-or-update-product/create-or-update-product/create-or-update-product.component';
import { HomeComponent } from './home/home.component';
import { LikesComponent } from './likes/likes.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { BakeriesComponent } from './bakeries/bakeries.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { MapsComponent } from './maps/maps.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CategoryComponent } from './category/category.component';
import { GestorUsuariosComponent } from './gestor-usuarios/gestor-usuarios.component';
import { CreteUpdateUserComponent } from './gestor-usuarios/crete-update-user/crete-update-user.component';
import { GestorPanaderiaComponent } from './gestor-panaderia/gestor-panaderia.component';
import { CreateUpdatePanaderiaComponent } from './gestor-panaderia/create-update-panaderia/create-update-panaderia.component';
import { GestorProductoComponent } from './gestor-producto/gestor-producto.component';
import { CreateUpdateProductoComponent } from './gestor-producto/create-update-producto/create-update-producto.component';
import { GestorPerfilComponent } from './gestor-perfil/gestor-perfil.component';
import { CreateUpdatePerfilComponent } from './gestor-perfil/create-update-perfil/create-update-perfil.component';
import { AlertasComponent } from './alertas/alertas.component';



@NgModule({
  declarations: [
    GestorUsuarioComponent,
    CreateOrUpdateUserComponent,
    GestorClienteComponent,
    GestorNotificacionComponent,
    GestorRequerimientosComponent,
    GestorOrdenTrabajoComponent,
    ConocenosMasComponent,
    CreateOrUpdateClientComponent,
    CreateOrUpdateRequirenmentComponent,
    CreateOrUpdateOrdenComponent,
    CreateOrUpdateNotificacionComponent,
    GestorProductosComponent,
    CreateOrUpdateProductComponent,
    HomeComponent,
    LikesComponent,
    WelcomeComponent,
    ProductsComponent,
    BakeriesComponent,
    FavoritesComponent,
    AboutUsComponent,
    HelpComponent,
    MapsComponent,
    ShoppingCartComponent,
    MyProfileComponent,
    ConfigurationComponent,
    CategoryComponent,
    GestorUsuariosComponent,
    CreteUpdateUserComponent,
    GestorPanaderiaComponent,
    CreateUpdatePanaderiaComponent,
    GestorProductoComponent,
    CreateUpdateProductoComponent,
    GestorPerfilComponent,
    CreateUpdatePerfilComponent,
    AlertasComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    TooltipModule
  ]
})
export class PageModule { }

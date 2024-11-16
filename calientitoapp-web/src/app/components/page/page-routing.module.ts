import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LikesComponent } from './likes/likes.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { BakeriesComponent } from './bakeries/bakeries.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from './products/products.component';
import { MapsComponent } from './maps/maps.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CategoryComponent } from './category/category.component';
import { GestorUsuariosComponent } from './gestor-usuarios/gestor-usuarios.component';
import { GestorPanaderiaComponent } from './gestor-panaderia/gestor-panaderia.component';
import { GestorProductoComponent } from './gestor-producto/gestor-producto.component';
import { GestorPerfilComponent } from './gestor-perfil/gestor-perfil.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    title: 'Bienvenida'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
    title: 'About Us'
  },
  {
    path: 'help',
    component: HelpComponent,
    title: 'Help'
  },
  {
    path: 'bakeries',
    component: BakeriesComponent,
    title: 'Panaderias'
  },
  {
    path: 'products/:id',
    component: ProductsComponent,
    title: 'Productos'
  },
  {
    path: 'likes',
    component: LikesComponent,
    title: 'Favoritos'
  },
  {
    path: 'maps',
    component: MapsComponent,
    title: 'Maps'
  },
  {
    path: 'shoppingCart',
    component: ShoppingCartComponent,
    title: 'Shopping Cart'
  },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    title: 'My Profile'
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    title: 'Configuration'
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Categoria'
  },
  {
    path: 'gestionUsuario',
    component: GestorUsuariosComponent,
    title: 'Gestion de usuarios'
  },
  {
    path: 'gestionPanaderia',
    component: GestorPanaderiaComponent,
    title: 'Gestion de panaderias'
  },
  {
    path: 'gestionProducto',
    component: GestorProductoComponent,
    title: 'Gestion de productos'
  },
  {
    path: 'gestionPerfil',
    component: GestorPerfilComponent,
    title: 'Gestion de perfiles'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

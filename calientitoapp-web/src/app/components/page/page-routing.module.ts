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
    path: 'products',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

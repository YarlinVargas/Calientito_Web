import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/index/index.module').then(m => m.IndexModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/page/page.module').then(m => m.PageModule),
    // canActivate: [authUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

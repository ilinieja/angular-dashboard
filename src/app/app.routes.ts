import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/new',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    component: ProductViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutesModule {
}

import { Routes } from '@angular/router';
import { CreateProductFormComponent } from './create-product-form/create-product-form.component';
import { ProductsComponent } from './products-list/products-list.component';

export const routes: Routes = [
  {
    path: 'products-list',
    component: ProductsComponent,
  },
  {
    path: 'create-products-form',
    component: CreateProductFormComponent,
  },
  {
    path: 'update-products-form/:oid',
    component: CreateProductFormComponent,
  },
  {
    path: '',
    component: ProductsComponent,
  },
];

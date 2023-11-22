import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((c) => c.ProductsComponent),
    children: [
      {
        path: 'product',
        loadComponent: () =>
          import('./products/pages/product-page/product-page.component').then(
            (c) => c.ProductPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'product',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
